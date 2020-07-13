<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DriveController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth');
    }
    public function index(Request $request)
    {
        \Log::info("good");
        \Log::info($request);

        if($request->user_id){

            //선택날짜의 운전 정보
            $drive_info = \DB::select("select * from drives where DATE_FORMAT(created_at, '%Y-%m-%d') = '{$request->date}' AND user_id = '{$request->user_id}'");
            //선택날짜의 위험 정보
            //현재날짜포함하여 최근 5일 구하기
            $day_5 = array();
            for($i = 0; $i <5; $i++){
                array_push($day_5,date("Y-m-d", strtotime($request->date ."-{$i} day")));
            }

            //최근 5일의 운전정보
            $day_5_info = array();
            for($i = 0; $i < count($day_5); $i++){
                // \Log::info($day_5[$i]);
                array_push($day_5_info, \DB::select("select * from drives where DATE_FORMAT(created_at, '%Y-%m-%d') = '{$day_5[$i]}' AND user_id = '{$request->user_id}'"));
            }

            // 해당날짜의 위험정보
            // $drive_detection = \DB::select("select * from drive_detections where DATE_FORMAT(created_at, '%Y-%m-%d') = '{$request->date}' AND user_id = '{$request->user_id}'");
            
            //최근 5일의 위험 정보
            $day_5_drive_detection= array();
            for($i = 0; $i < count($day_5); $i++){
                //기준날짜에서 -i일의 운전감지데이터를 value에 넣음
                $value = \DB::select("select * from drive_detections where DATE_FORMAT(created_at, '%Y-%m-%d') = DATE_SUB('{$request->date}', INTERVAL {$i} DAY)  AND user_id = '{$request->user_id}'");
                if($value){
                    array_push($day_5_drive_detection, $value);
                }
                else{
                    array_push($day_5_drive_detection, null);

                }
            }
            //최근 5일의 위험 정보 합계
            $day_5_danger_count = array();
            for($i = 0; $i < count($day_5); $i++){
                $count_report = 0; //사고 수
                $count_sudden_acceleration = 0; //급 가속 수
                $count_sudden_stop = 0; //급 감속 수
                $count_sleep = 0;   //졸음 횟수
                //해당날짜의 위험 횟수 구하기
                if($day_5_drive_detection[$i]){
                    for($j = 0; $j < count($day_5_drive_detection[$i]); $j++){
                        //값이 있는지 확인
                        if($day_5_drive_detection[$i][$j]){
                            $count_report += $day_5_drive_detection[$i][$j]->bool_report;
                            $count_sudden_acceleration += $day_5_drive_detection[$i][$j]->bool_sudden_acceleration;
                            $count_sudden_stop += $day_5_drive_detection[$i][$j]->bool_sudden_stop;
                            $count_sleep += $day_5_drive_detection[$i][$j]->bool_sleep;
                        }
                        else{
                            break;
                        }
                    }
                }
                //총 위험횟수
                $count_danger = $count_report + $count_sudden_acceleration + $count_sudden_stop + $count_sleep;
                //급 가속, 감속, 졸음 횟수를 배열에 저장
                $drive_count = [
                    "count_danger" => $count_danger,
                    "count_report" => $count_report,
                    "count_sudden_acceleration" => $count_sudden_acceleration, 
                    "count_sudden_stop" => $count_sudden_stop, 
                    "count_sleep" => $count_sleep
                ];
                array_push($day_5_danger_count, $drive_count);
            }
            //해당날짜의 운전시간 구하기(초)
            // $drive_sec = 0;
            // for($i = 0; $i < count($drive); $i++){
            //     $drive_sec += strtotime($drive[$i]->created_at) - strtotime($drive[$i]->created_at);
            // }
            $day_5_sec = [];
            for($i = 0; $i < count($day_5); $i++){
                $sec = 0;
                for($j = 0; $j < count($day_5_info[$i]); $j++){
                    $sec += strtotime($day_5_info[$i][$j]->updated_at) - strtotime($day_5_info[$i][$j]->created_at);
                }
                array_push($day_5_sec, $sec);
            }

            //사고 여부
            $reports = \DB::select("select * from drive_detections where DATE_FORMAT(created_at, '%Y-%m-%d') = '{$request->date}' AND user_id = '{$request->user_id}' AND bool_report = true");

            // $reports = \App\Drive_detection::
            //     whereUser_id(auth()->user()->id)
            //     ->whereBool_report(true)
            //     ->where(\DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d')"),$request->date)
            //     ->get();
            
            //당일 운전점수
            $score_all = 0; //총 점수
            $score_sudden_acceleration = 100; //급 가속 점수
            $score_sudden_stop = 100; //급 정거 점수
            $score_sleep = 100;   //졸음 점수
            $score_report = 100;   //사고 점수
            $mul = 1;       //감소 배수(급가속, 급감속은 30분 ~ 1시간 운전시 2배 적용, 30분 미만시 5배적용)
            $add_score = 0; //추가 점수

            //운전시간이 1800초 미만일시 감소점수 5배
            // if($day_5_sec[0] < 1800){
            //     $mul = 5;
            // }

            //운전시간이 1800~3600초일시 감소점수 2배
            // elseif($day_5_sec[0] < 3600){
            //     $mul = 2;
            // }

            //운전시간이 3600초 이상일 경우 증가점수 부여
            //증가점수 기준 : 1시간에서 +10분 운전당  => + 점수 4항목 +2점(8점 = 총점수 2점)
            // else{
            //     $add_score = (($day_5_sec[0]-3600)/600) *2;
            // }

            //점수 감산
            // $score_sudden_acceleration -= ($day_5_danger_count[0]["count_sudden_acceleration"] * (40 * $mul)) - $add_score;
            // $score_sudden_stop -= ($day_5_danger_count[0]["count_sudden_stop"] * (40 * $mul)) - $add_score;
            // $score_sleep -= ($day_5_danger_count[0]["count_sleep"] * (100 * $mul)) - $add_score;
            // $score_report -= ($day_5_danger_count[0]["count_report"] * (100 * $mul)) - $add_score;
            $score_sudden_acceleration -= ($day_5_danger_count[0]["count_sudden_acceleration"] * (40 * $mul));
            $score_sudden_stop -= ($day_5_danger_count[0]["count_sudden_stop"] * (40 * $mul));
            $score_sleep -= ($day_5_danger_count[0]["count_sleep"] * (50 * $mul));
            $score_report -= ($day_5_danger_count[0]["count_report"] * (100 * $mul));
            //총 점수
            $score = [$score_sudden_acceleration, $score_sudden_stop, $score_sleep, $score_report];
            for($i = 0; $i < count($score); $i++){
                if($score[$i] >= 100){
                    $score[$i] = 100;
                }
                else if($score[$i] <= 0){
                    $score[$i] = 0;
                }
            }

            // $score_all = ($score_sudden_acceleration + $score_sudden_stop + $score_sleep + $score_report) / 4;
            //배열에 추가
            // $score = [$score_sudden_acceleration, $score_sudden_stop, $score_sleep, $score_report];
            \Log::info($score);
            
            //점수 최대, 최소 점수 부여
            for($i = 0; $i < count($score); $i++){
                //점수가 100초과시
                if($score[$i] > 100){
                    $score[$i] = 100;
                }
                //점수가 0미만시
                elseif($score[$i] < 0){
                    $score[$i] = 0;
                }
            }
            
            // \Log::info($score_sudden_acceleration);
            // \Log::info("선택 날짜 : " . $request->date);
            \Log::info("선택한 날짜의 정보 :", $drive_info);
            \Log::info("최근 5일 : ", $day_5);
            // \Log::info("최근 5일의 운전 정보 : ", $day_5_info);  //배열안의 배열 (하루에 여러번 운전했을 수 있으니)
            \Log::info("최근 5일의 위험 정보 합계: ", $day_5_danger_count);  //배열안의 배열 (하루에 여러번 운전했을 수 있으니)
            \Log::info("최근 5일의 운전 감지 정보: ", $day_5_drive_detection);
            // \Log::info("당일 위험 카운트 : ", $day_5_danger_count[0]);
            // \Log::info("당일 운전 시간(초) : ". $day_5_sec[0]);
            \Log::info("최근 5일의 운전 시간(초) : ", $day_5_sec);
            \Log::info("당일 사고 여부", $reports);
            \Log::info("총, 가속, 감속, 졸음, 사고점수 : ", $score);
            // \Log::info($error);
            //1시간에 급감속이나 급가속, 졸음 등을 1번했을 경우 모범?
            //default = 100에서 깎아내리는 형식?
            return response()->json([
                'drive_info' => $drive_info ,
                // 'date' => $request->date,
                'day_5_sec' => $day_5_sec,
                'day_5' => $day_5,
                // 'day_5_info' => $day_5_info,
                'day_5_danger_count' => $day_5_danger_count,
                'day_5_drive_detection' => $day_5_drive_detection,
                'reports' => $reports,
                'score' => $score
            ], 201);
        }
        
        return view('home.main');
    }

    public function create()
    {

    }
    public function store(Request $request)
    {
        
    }

    public function show($option) {
        
    }

}
