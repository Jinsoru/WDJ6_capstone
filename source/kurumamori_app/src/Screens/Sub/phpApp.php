<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $app_user = \App\User::whereId(12)->first();
      //비상연락망
      $app_phone = \App\Medical_info::whereUser_id($app_user->id)->first()->guardian_phone;
      //현재 질환
      $app_sickness_info = \App\Sickness::whereUser_id($app_user->id)->first();
      //손해보험사
      $app_insurance = \App\Insurance::whereUser_id($app_user->id)->first();
      $app_insurance_name = $app_insurance ? \App\Insurance_list::whereId($app_insurance->insurance_list_id)->first() : null;
      $profile = [$app_user, $app_phone, $app_sickness_info, $app_insurance_name, $app_insurance];

      return response()->json($profile);

      // return response()->json(["index"],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      return response()->json(["create"],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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
        $app_phone = \App\Medical_info::whereUser_id($app_user->id)->first() ? \App\Medical_info::whereUser_id($app_user->id)->first()->guardian_phone : "";
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
          'drive_score' => 0,
          'sleep_count' => 0,
          'sudden_stop_count' => 0,
          'sudden_acceleration_count' => 0,
          'created_at' => date("Y-m-d hh:mm:ss"),
        ]);
        return response()->json($drive_start->id);
      }

      //운전종료 : 운전 테이블 업데이트(받는 것 : drive_id, 각각 카운트)
      elseif($request->_option == 4){
        $drive_end = \App\Drive::whereId($request->_drive_id)->update([
          // 'drive_score' => null,
          'sleep_count' => $request->_sleep_count,
          'sudden_stop_count' => $request->_sudden_stop_count,
          'sudden_acceleration_count' => $request->_sudden_acceleration_count,
        ]);
          return response()->json([
            'success'=>true
          ]);
      }

      //위험감지 테이블 생성(받는 것 : drive_id, user_id, latitude, longitude, $arr[급가속여부, 사고여부 등등])
      elseif($request->_option == 5){
        //
        // $arr = [
        //   $request->_bool_report,
        //   $request->_bool_sudden_acceleration,
        //   $request->_bool_sudden_stop,
        //   $request->_bool_sleep
        // ];
        $drive = \App\Drive_detection::create([
          'drive_id' => $request->_drive_id,
          'user_id' => $request->_key,
          'latitude' => $request->_latitude,
          'longitude' => $request->_longitude,
          'bool_report' => $request->_bool_report,
          'bool_sudden_acceleration' => $request->_bool_sudden_acceleration,
          'bool_sudden_stop' => $request->_bool_sudden_stop,
          'bool_sleep' => $request->_bool_sleep,
        ]);
        return response()->json($drive);
      }

      //신고 프로세스(받는 것 : user_id, latitude, longitude)
      elseif($request->_option == 6){
        date_default_timezone_set('Asia/Seoul');

        $url = "http://api.solapi.com/messages/v4/send";
        $apiKey = 'xxx';
        $apiSecret ='xxxxxx';
        $date = date('Y-m-d\TH:i:s.Z\Z', time());
        $salt = uniqid();
        $signature = hash_hmac('sha256', $date.$salt, $apiSecret);
        $header = "Authorization: HMAC-SHA256 apiKey={$apiKey}, date={$date}, salt={$salt}, signature={$signature}";
        $sickness = json_encode(\App\Sickness::whereUser_id($request->_key)->get()->map(function($item,$key){
            return "보유질환 : ".$item->sickness_name." | 복용약 : ".$item->medicine." | 주 증상 : ".$item->symptom." | 주 병원 :".$item->hospital;
        })->implode('||'),JSON_UNESCAPED_UNICODE);
        $past_sickness = json_encode(\App\Past_sickness::whereUser_id($request->_key)->get()->map(function($item,$key){
            return "과거 보유질환 : ".$item->past_sickness_name." | 복용 이력 : ".$item->past_sickness_supplementation;
        })->implode('||'),JSON_UNESCAPED_UNICODE);

        // $result_address = "대한민국 대구광역시 북구";
        // $result_address_url = "https://www.google.com/maps/place/%EB%8C%80%EA%B5%AC%EA%B4%91%EC%97%AD%EC%8B%9C+%EB%B6%81%EA%B5%AC+%EB%B3%B5%ED%98%842%EB%8F%99+%EB%B3%B5%ED%98%84%EB%A1%9C+35/@35.8963134,128.6198624,17z/data=!3m1!4b1!4m5!3m4!1s0x3565e1bb2f087589:0x5a55f9de5c2d9ea!8m2!3d35.8963091!4d128.6220511?hl=ko";
        header("Content-Type: text/html; charset=utf-8");
        $apiKey_address = env('GCP_API_KEY');
        // $latitude = 35.893932;
        // $longitude = 128.620904;
        $url_address = "https://maps.googleapis.com/maps/api/geocode/json?latlng={$request->_latitude},{$request->_longitude}&key={$apiKey_address}&language=ko";
        $address = curl_init();
        curl_setopt($address,CURLOPT_URL,$url_address);
        curl_setopt($address, CURLOPT_POST, 0);
        curl_setopt($address,CURLOPT_RETURNTRANSFER, true);
        $result_address = curl_exec($address);
        $result_address = json_decode($result_address); 

        $result_address_url = "https://www.google.com/maps/search/?api=1&query={$request->_latitude},{$request->_longitude}";

        $user_data = 
        "-----신고자 정보-----\n"
        ."이름 : ".\App\User::whereId($request->_key)->first()->name."\n"
        ."생년월일 : ".\App\User::whereId($request->_key)->first()->birth." | 성별 : ".\App\User::whereId($request->_key)->first()->gender."\n"
        ."전화번호 : ".\App\User::whereId($request->_key)->first()->phone."\n"
        ."-----의료 정보-----\n"
        ."보호자 전화번호 : ".\App\Medical_info::whereUser_id($request->_key)->first()->guardian_phone."\n"
        ."혈액형 : ".\App\Medical_info::whereUser_id($request->_key)->first()->blood_type."\n"
        ."기타메시지 : ".\App\Medical_info::whereUser_id($request->_key)->first()->report_request."\n"
        ."-----병력-----\n"
        .substr($sickness , 0, -1)."경북대병원\n"
        ."-----과거 병력-----\n"
        .substr($past_sickness , 0, -1)."\n"
        ."-----사고 발생 지점-----\n"
        // .$result_address->results[0]->formatted_address."\n"
        .$result_address_url
        ;
        
        $fields = new \stdClass();
        $message = new \stdClass();
        $message->to = "00012341234";
        $message->from = "00012341234";
        $message->subject = "[kurumamori119 신고]";
        $message->text = $user_data;
        $message->type = "LMS";
        $fields->message = $message;
        $fields_string = json_encode($fields);

        // $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,

        
        $sms = curl_init();
        curl_setopt($sms,CURLOPT_URL,$url);
        curl_setopt($sms, CURLOPT_HTTPHEADER, array($header, "Content-Type: application/json"));
        curl_setopt($sms, CURLOPT_POST, 1);
        curl_setopt($sms, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($sms,CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($sms);
        // json_encode($message,JSON_UNESCAPED_UNICODE)."<br/><br/>".$user_data;
        return $result;
        // return response()->json([
        //   'success'=> true
        // ]);

      }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return response()->json(["show"],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
      return response()->json(["edit"],200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      return response()->json(["update"],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      return response()->json(["destroy"],200);
    }
}