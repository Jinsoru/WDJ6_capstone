<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index(Request $request)
    {
        return view('test');
    }
    public function show(Request $request)
    {
        date_default_timezone_set('Asia/Seoul');

        $url = "http://api.solapi.com/messages/v4/send";
        $apiKey = 'NCSOLAE45HDEPTH5';
        $apiSecret ='XWW3TK7GCPEYZWC6NZHFA6JBD3FREK4K';
        $date = date('Y-m-d\TH:i:s.Z\Z', time());
        $salt = uniqid();
        $signature = hash_hmac('sha256', $date.$salt, $apiSecret);
        $header = "Authorization: HMAC-SHA256 apiKey={$apiKey}, date={$date}, salt={$salt}, signature={$signature}";
        $sickness = json_encode(\App\Sickness::whereUser_id(12)->get()->map(function($item,$key){
            return "보유질환 : ".$item->sickness_name." | 복용약 : ".$item->medicine." | 주 증상 : ".$item->symptom." | 주 병원 :".$item->hospital;
        })->implode('||'),JSON_UNESCAPED_UNICODE);
        $past_sickness = json_encode(\App\Past_sickness::whereUser_id(12)->get()->map(function($item,$key){
            return "과거 보유질환 : ".$item->past_sickness_name." | 복용 이력 : ".$item->past_sickness_supplementation;
        })->implode('||'),JSON_UNESCAPED_UNICODE);



        // $result_address = "대한민국 대구광역시 북구 복현2동 복현로 35";
        // $result_address_url = "https://www.google.com/maps/place/%EB%8C%80%EA%B5%AC%EA%B4%91%EC%97%AD%EC%8B%9C+%EB%B6%81%EA%B5%AC+%EB%B3%B5%ED%98%842%EB%8F%99+%EB%B3%B5%ED%98%84%EB%A1%9C+35/@35.8963134,128.6198624,17z/data=!3m1!4b1!4m5!3m4!1s0x3565e1bb2f087589:0x5a55f9de5c2d9ea!8m2!3d35.8963091!4d128.6220511?hl=ko";
        header("Content-Type: text/html; charset=utf-8");
        $apiKey_address = env('MIX_GCP_API_KEY');
        $latitude = 35.893932;
        $longitude = 128.620904;
        $url_address = "https://maps.googleapis.com/maps/api/geocode/json?latlng={$latitude},{$longitude}&key={$apiKey_address}&language=ko";
        $address = \curl_init();
        \curl_setopt($address,CURLOPT_URL,$url_address);
        \curl_setopt($address, CURLOPT_POST, 0);
        \curl_setopt($address,CURLOPT_RETURNTRANSFER, true);
        $result_address = curl_exec($address);
        $result_address = json_decode($result_address); 

        $result_address_url = "https://www.google.com/maps/search/?api=1&query={$latitude},{$longitude}";

        $user_data = 
        "-----신고자 정보-----\n"
        ."이름 : ".\App\User::find(12)->name."\n"
        ."생년월일 : ".\App\User::find(12)->birth." | 성별 : ".\App\User::find(12)->gender."\n"
        ."전화번호 : ".\App\User::find(12)->phone."\n"
        ."-----의료 정보-----\n"
        ."보호자 전화번호 : ".\App\Medical_info::whereUser_id(12)->first()->guardian_phone."\n"
        ."혈액형 : ".\App\Medical_info::whereUser_id(12)->first()->blood_type."\n"
        ."기타메시지 : ".\App\Medical_info::whereUser_id(12)->first()->report_request."\n"
        ."-----병력-----\n"
        .substr($sickness , 0, -1)."경북대병원\n"
        ."-----과거 병력-----\n"
        .substr($past_sickness , 0, -1)."\n"
        ."-----사고 발생 지점-----\n"
        .$result_address->results[0]->formatted_address."\n"
        .$result_address_url
        ;
        
        $fields = new \stdClass();
        $message = new \stdClass();
        // $message->to = "01035989003";
        // $message->to = "01023560525";
        // $message->to = "01027794593";
        $message->to = "01073746119";
        // $message->to = "01050039201";
        $message->from = "01050039201";
        $message->subject = "[kurumamori119 신고]";
        $message->text = $user_data;
        $message->type = "LMS";
        $fields->message = $message;
        $fields_string = json_encode($fields);

        // $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,

        
        $sms = \curl_init();
        \curl_setopt($sms,CURLOPT_URL,$url);
        \curl_setopt($sms, CURLOPT_HTTPHEADER, array($header, "Content-Type: application/json"));
        \curl_setopt($sms, CURLOPT_POST, 1);
        \curl_setopt($sms, CURLOPT_POSTFIELDS, $fields_string);
        \curl_setopt($sms,CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($sms);
        // return json_encode($message,JSON_UNESCAPED_UNICODE)."<br/><br/>".$user_data;
        return $result;
    }
    function initMap() {
        
        // $map = new google.maps.Map(document.getElementById('map'), {
        //   zoom: 8,
        //   center: {lat: 40.731, lng: -73.997}
        // });
        // $geocoder = new google.maps.Geocoder;
        // $infowindow = new google.maps.InfoWindow;
      
        // document.getElementById('submit').addEventListener('click', function() {
        //     geocodeLatLng($geocoder, $map, $infowindow);
        // });
    }
      
    // function geocodeLatLng($geocoder, $map, $infowindow) {
    //     $input = document.getElementById('latlng').value;
    //     $latlngStr = input.split(',', 2);
    //     $latlng = {$lat: parseFloat($latlngStr[0]), $lng: parseFloat($latlngStr[1])};
    //     $geocoder.geocode({'location': latlng}, function(results, status) {
    //       if (status === 'OK') {
    //         if (results[0]) {
    //           $map.setZoom(11);
    //           var marker = new google.maps.Marker({
    //             position: latlng,
    //             map: map
    //           });
    //           infowindow.setContent(results[0].formatted_address);
    //           infowindow.open(map, marker);
    //         } else {
    //           window.alert('No results found');
    //         }
    //       } else {
    //         window.alert('Geocoder failed due to: ' + status);
    //       }
    //     });
    // }
}
