<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
  public function index(Request $request)
  {
    return response()->json(["index"],200);
  }

  public function create()
  {
    return response()->json(["create"],200);
  }

  public function store(Request $request)
  {
    //로그인 로직(받는 것 : email, password)
    if($request->_option == 0){
      if (!auth()->attempt(["email"=>"{$request->_email}","password"=>"{$request->_password}"], $request->has('remember'))) {
        return response()->json(["비밀번호가 틀립니다."],200);
      }
      if (auth()->user()->confirm_code) {
        return response()->json(["이메일로 가입을 확인해주세요."],200);
      }
      $user = \App\User::whereEmail($request->_email)->first();

      return response()->json($user);
    }
    
    //정보 로직(받는 것 : user_id)
    elseif($request->_option == 1){
      //회원정보
      $app_user = \App\User::whereId($request->_key)->first();
      //비상연락망
      $app_phone = \App\Medical_info::whereUser_id($app_user->id)->first()->guardian_phone;
      //현재 질환
      $app_sickness_info = \App\Sickness::whereUser_id($app_user->id)->first();
      //손해보험사
      $app_insurance = \App\Insurance::whereUser_id($app_user->id)->first();
      $app_insurance_name = $app_insurance ? \App\Insurance_list::whereId($app_insurance->insurance_list_id)->first() : "";
      $profile = [$app_user, $app_phone, $app_sickness_info, $app_insurance_name, $app_insurance];

      return response()->json($profile);
    }

    //제품정보 로직(받는 것 : user_id)
    elseif($request->_option == 2){
      $app_product = \App\Product::whereUser_id($request->_key)->first();
      $app_product_buy = $app_product ? \App\Product_buy::whereProduct_key($app_product->product_key)->first() : "";

      return response()->json($app_product_buy);
    }

    //운전시작 : 운전 테이블 생성(받는 것 : user_id)
    elseif($request->_option == 3){
      $drive_start = \App\Drive::create([
        'user_id' => $request->_key,
        'drive_score' => null,
        'sleep_count' => null,
        'sudden_stop_count' => null,
        'sudden_acceleration_count' => null,
        'start_time' => date("Y-m-d hh:mm:ss"),
      ]);

      return response()->json($drive_start);
    }

    //운전종료 : 운전 테이블 업데이트(받는 것 : user_id, drive_id, 각각 카운트)
    elseif($request->_option == 4){
      $drive_end = \App\Drive::whereId($request->drive_id)->update([
        // 'user_id' => $request->id,
        // 'drive_score' => null,
        'sleep_count' => $request->_sleep_count,
        'sudden_stop_count' => $request->_sudden_stop_count,
        'sudden_acceleration_count' => $request->_sudden_acceleration_count,
        // 'start_time' => date("Y-m-d hh:mm:ss"),
      ]);

      return response()->json($drive_end);
    }

    //위험감지 테이블 생성(받는 것 : drive_id, user_id, latitude, longitude, $arr[급가속여부, 사고여부 등등])
    elseif($request->_option == 5){
      $arr = [
        $request->_bool_report,
        $request->_bool_sudden_acceleration,
        $request->_bool_sudden_stop,
        $request->_bool_sleep
      ];
      $drive = \App\Drive_detection::create([
        'drive_id' => $request->_drive_id,
        'user_id' => $request->_user_id,
        'latitude' => $request->_latitude,
        'longitude' => $request->_longitude,
        'bool_report' => $arr[0],
        'bool_sudden_acceleration' => $arr[1],
        'bool_sudden_stop' => $arr[2],
        'bool_sleep' => $arr[3],
      ]);
    }

    //신고 프로세스(받는 것 : user_id, latitude, longitude)
    elseif($request->_option == 6){
      date_default_timezone_set('Asia/Seoul');

      $url = "http://api.solapi.com/messages/v4/send";
      $apiKey = ' '; // 키
      $apiSecret =' '; // 비번
      $date = date('Y-m-d\TH:i:s.Z\Z', time());
      $salt = uniqid();
      $signature = hash_hmac('sha256', $date.$salt, $apiSecret);
      $header = "Authorization: HMAC-SHA256 apiKey={$apiKey}, date={$date}, salt={$salt}, signature={$signature}";
      $sickness = json_encode(\App\Sickness::whereUser_id(3)->get()->map(function($item,$key){
          return "보유질환 : ".$item->sickness_name." | 복용약 : ".$item->medicine." | 주 증상 : ".$item->symptom." | 주 병원 :".$item->hospital;
      })->implode('||'),JSON_UNESCAPED_UNICODE);
      $past_sickness = json_encode(\App\Past_sickness::whereUser_id(3)->get()->map(function($item,$key){
          return "과거 보유질환 : ".$item->past_sickness_name." | 복용 이력 : ".$item->past_sickness_supplementation;
      })->implode('||'),JSON_UNESCAPED_UNICODE);

      header("Content-Type: text/html; charset=utf-8");
      $apiKey_address = env('GCP_API_KEY');
      $latitude = 30; // 예시
      $longitude = 120; // 예시
      $url_address = "https://maps.googleapis.com/maps/api/geocode/json?latlng={$latitude},{$longitude}&key={$apiKey_address}&language=ko"; // 구글
      $address = curl_init();
      curl_setopt($address,CURLOPT_URL,$url_address);
      curl_setopt($address, CURLOPT_POST, 0);
      curl_setopt($address,CURLOPT_RETURNTRANSFER, true);

      $result_address = curl_exec($address);
      \Log::info(\App\User::first());
      \Log::info($result_address);
      \Log::info(gettype($result_address));       //string

      $result_address = json_decode($result_address); 
      \Log::info(gettype($result_address));       //object
      \Log::info($result_address->results[0]->formatted_address);

      $user_data = 
        "-----신고자 정보-----\n"
        ."이름 : ".\App\User::find(3)->name."\n"
        ."생년월일 : ".\App\User::find(3)->birth." | 성별 : ".\App\User::find(3)->gender."\n"
        ."전화번호 : ".\App\User::find(3)->phone."\n"
        ."-----의료 정보-----\n"
        ."보호자 전화번호 : ".\App\Medical_info::whereUser_id(3)->first()->guardian_phone."\n"
        ."혈액형 : ".\App\Medical_info::whereUser_id(3)->first()->blood_type."\n"
        ."기타메시지 : ".\App\Medical_info::whereUser_id(3)->first()->report_request."\n"
        ."-----병력-----\n"
        .substr($sickness , 0, -1)."\n"
        ."-----과거 병력-----\n"
        .substr($past_sickness , 0, -1)."\n"
        ."-----사고 발생 지점-----\n"
        .$result_address->results[0]->formatted_address."\n"
      ;
      
      $fields = new \stdClass();
      $message = new \stdClass();
      $message->to = " "; // 보낼사람
      $message->from = " "; // 받을 사람
      $message->subject = "[kurumamori119 신고]";
      $message->text = $user_data;
      $message->type = "LMS";
      $fields->message = $message;
      $fields_string = json_encode($fields);
      
      $sms = curl_init();
      curl_setopt($sms,CURLOPT_URL,$url);
      curl_setopt($sms, CURLOPT_HTTPHEADER, array($header, "Content-Type: application/json"));
      curl_setopt($sms, CURLOPT_POST, 1);
      curl_setopt($sms, CURLOPT_POSTFIELDS, $fields_string);
      curl_setopt($sms,CURLOPT_RETURNTRANSFER, true);

      // $result = curl_exec($sms);
      return json_encode($message,JSON_UNESCAPED_UNICODE)."<br/><br/>".$user_data;
      // return $result;
    }
  }
  
  public function show($id)
  {
    return response()->json(["show"],200);
  }

  public function edit($id)
  {
    return response()->json(["edit"],200);
  }

  public function update(Request $request, $id)
  {
    return response()->json(["update"],200);
  }

  public function destroy($id)
  {
    return response()->json(["destroy"],200);
  }
}