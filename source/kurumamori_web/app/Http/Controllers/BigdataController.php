<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BigdataController extends Controller
{
    public function index()
    {
        return view('home.main');

    }

    public function show()
    {
        return view('home.main');
    }

    public function data(Request $request){
        // 현재 날짜 기준으로 최근 7일 날짜 구하기
        $date = date("Y-m-d");
        $day_7 = array();
        for($i = 0; $i < 7; $i++) {
            array_push($day_7, date("Y-m-d", strtotime($date . "-{$i} day")));
        }
        \Log::info($day_7);     // 2020-05-09, 2020-05-08 ...
        
        // 쿼리빌더를 위한 배열
        $time_set = [00, 06, 12, 18, 24];
        // $danger = ["bool_report","bool_sudden_acceleration","bool_sudden_stop","bool_sleep"];
        $age = [20,30,40,50,60];

        if($request->option == "accident"){
            $danger = ["bool_report"];
        }
        elseif($request->option == "sudden"){
            $danger = ["bool_sudden_acceleration", "bool_sudden_stop"];
        }
        else{
            $danger = ["bool_sleep"];
        }

        // 시간대별 사람들의 전체 졸음운전, 급정거 급가속, 교통사고 횟수
        for($i = 0; $i < count($time_set); $i++){
            if($i < 4) {
                for($j = 0; $j < count($danger); $j++) {
                    $time_set_data[$i][$danger[$j]] = \DB::table('drive_detections')
                    ->select(\DB::raw("count({$danger[$j]}) as {$danger[$j]}_count"))
                    ->where("drive_detections.{$danger[$j]}","=",true)
                    ->whereBetween(\DB::raw("DATE_FORMAT(drive_detections.created_at, '%H')"), [$time_set[$i], $time_set[$i+1]])
                    ->first();
                }     
            } else {
                break;
            }    
        };
        \Log::info($time_set_data);

        
        // 연령대별 사람들의 최근 7일간의 졸음운전, 급정거 급가속, 교통사고 횟수
        for($i = 0; $i < count($age); $i++){        //나이
            if($age[$i] >= 60) {    // 60대 이상
                for($j = 0; $j < count($danger); $j++){ //위험정보(급가속 등등)
                    for($k = 0; $k < count($day_7); $k++){  // 1 ~ 7일
                        $age_data[$age[$i]][$danger[$j]][$day_7[$k]] = 
                        \DB::table('drive_detections')
                        ->select(\DB::raw("count({$danger[$j]}) as {$danger[$j]}_count"))
                        ->join('users', 'drive_detections.user_id', '=', 'users.id')
                        ->where(\DB::raw("DATE_FORMAT(now(), '%Y')-substring(users.birth,1,4)"), ">", 60)
                        ->where("drive_detections.{$danger[$j]}","=",true)
                        ->where(\DB::raw("DATE_FORMAT(drive_detections.created_at, '%Y-%m-%d')"), "=", "{$day_7[$k]}")
                        ->first();
                    };
                }
            } else{     // 60대 미만
                for($j = 0; $j < count($danger); $j++){
                    for($k = 0; $k < count($day_7); $k++){
                        $age_data[$age[$i]][$danger[$j]][$day_7[$k]] = 
                        \DB::table('drive_detections')
                        ->select(\DB::raw("count({$danger[$j]}) as {$danger[$j]}_count"))
                        ->join('users', 'drive_detections.user_id', '=', 'users.id')
                        ->whereBetween(\DB::raw("DATE_FORMAT(now(), '%Y')-substring(users.birth,1,4)"),[$age[$i],$age[$i] + 9])
                        ->where("drive_detections.{$danger[$j]}","=",true)
                        ->where(\DB::raw("DATE_FORMAT(drive_detections.created_at, '%Y-%m-%d')"), "=", "{$day_7[$k]}")
                        ->first();
                    };
                }
            }
        }
        \Log::info($age_data);

        // return
        $day_7_drive_detection= array();
        for($i = 0; $i < count($day_7); $i++){
            //$value는 배열로 리턴됨
            $value = \DB::select("select * from drive_detections where DATE_FORMAT(created_at, '%Y-%m-%d') = DATE_SUB('{$date}', INTERVAL {$i} DAY)");
            if($value){
                array_push($day_7_drive_detection, $value);
            }
            else{
                array_push($day_7_drive_detection, null);

            }
        }
        \Log::info($day_7_drive_detection);
        // return view('home.main', compact('option', 'day_7', 'time_set', 'time_set_data', 'age_data', 'day_7_drive_detection'));
        return response()->json([
            'day_7' => $day_7,
            // 'time_set' => $time_set,
            'time_set_data' => $time_set_data,
            'age_data' => $age_data,
            'day_7_drive_detection' => $day_7_drive_detection
        ]);
    }
}
