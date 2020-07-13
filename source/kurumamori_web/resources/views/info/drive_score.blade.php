@extends('layouts.app')

@section('content')
<section id="intro" class="section intro" style="padding: 50px 0px 0px 0px; background-color:rgb(247, 247, 247)">
<!-- Content Row -->
<div class="row">
    
    <!-- Page Heading -->
    <div class="col-md-2 col-xs-2 col-sm-2">
        @include('layouts.partial.info_menu')
    </div>
    <div class="col-md-10">
        <br />
        <br />
        <br />
        <h3> 운전 점수 확인</h3>
        <div class="row">
            <div class="col-md-6"></div>

            <div class="col-md-2 text-center">
                <p style="font-size:24px;margin-top:13px; margin-right:15px;color:green;font-weight:800;">
                운전날짜 검색
                </p>
            </div>
            <br/>
            <div class="col-md-2">
                <div class="form-group {{ $errors->has('drive_date') ? 'has-error' : '' }}">
                    <!-- 시작시 기본 날짜 설정은 value를 이용 -->
                <input id="drive_date"type="text" name="drive_date" class="form-control datePicker"  value="{{$date ? $date : date("Y-m-d")}}" readonly>
                    <p style="color:red">
                        {!! $errors->first('drive_date', '<span class="form-error">:message</span>') !!}
                    </p>
                </div>
            </div>
            <div class="col-md-1"></div>
            <br/>
        </div>
    @if($drive)

        {{-- 아이콘  --}}
        @include("info.drive_score.score_icon")
        {{-- 차트  --}}
        @include("info.drive_score.chart")
        {{-- 구글맵, 설명 --}}
        <div class="row">
            <div class="col-xl-11 col-lg-11 col-md-11">
                <div class="card shadow" >
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">오늘의 운전점수</h6>
                    </div>
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <div class="card-body">
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div id="map" style="width:100%; height:500px;"></div>
                                    {{-- <img src="/icon/orange_map_icon.png">급가속 구간
                                    <img src="/icon/green_map_icon.png">급감속 구간
                                    <img src="/icon/blue_map_icon.png">졸음 구간
                                    <img src="/icon/red_map_icon.png">신고 구간 --}}
                                </div>
                            </div> 
                    
                        </div>
                        <div class="col-sm-1 col-md-1"></div>

                        {{-- 오늘의 운전점수 --}}
                        <div class="col-sm-4 col-md-4">
                            <div class="thumbnail">
                                <div class="caption">
                                    {{-- <h3 class="text-center">오늘의 운전점수</h3> --}}
                                    {{-- <hr style="background-color:darkgrey;"/> --}}
                                    <p>총 운전 점수 : {{$score[0]}}점</p>
                                    <p>졸음 횟수 : {{$day_5_danger_info[0]["count_sleep"]}}회</p>
                                    <p>급 가속 횟수 : {{$day_5_danger_info[0]["count_sudden_acceleration"]}}회</p>
                                    <p>급 감속 횟수 : {{$day_5_danger_info[0]["count_sudden_stop"]}}회</p>
                                    {{-- 당일 사고 정보 --}}
                                    @if($reports)
                                        <p>사고 : {{$day_5_danger_info[0]["count_report"]}}건</p>
                                        @for($i = 0; $i < count($reports); $i++)
                                            <p class="gps{{$reports[$i]->id}}">사고 장소{{$i+1}} :                                     {{-- 위도 경도로 주소찾기 --}}
                                                <script>
                                                    var gps = "";
                                                    var API_KEY = "{{env('GCP_API_KEY')}}";
                                                    var latitude = "{{$reports[$i]->latitude}}";
                                                    var longitude = "{{$reports[$i]->longitude}}";
                                                    console.log(latitude);
                                                    console.log(longitude);

                                                    new Promise(function(resolve, reject) {
                                                        resolve(
                                                            $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
                                                            function(data) {
                                                                console.log(data);
                                                                gps = data.results[0].formatted_address;
                                                                console.log(gps);
                                                                $(`.gps{{$reports[$i]->id}}`).text("사고 장소{{$i+1}} : " + gps);
                                                            }));
                                                    });
                                                    // $(".gps{{$reports[$i]->id}}").text("사고 장소{{$i+1}} : api 요금때문에 주석처리 해놨음");

                                                </script>
                                            </p>
                                        @endfor
                                    @else
                                    <p>사고 여부 : 없음</p>
                                    
                                    @endif
                                    {{-- 당일 운전시간 --}}
                                    @for($i = 0; $i < count($drive); $i++)
                                        <p>운전 시간 : {{$drive[$i]->created_at}} ~ {{$drive[$i]->updated_at}}</p>
                                    @endfor
                                </div>
                            </div>
                        </div>
                        {{-- <div class="col-sm-1 col-md-1"></div> --}}
                        {{-- Styling for the area chart can be found in the <code>/js/demo/chart-area-demo.js</code> file. --}}
                        <div class="card-body">
                            <hr>
                            <div class="col-xl-11 col-lg-11 col-md-11">
                            {{-- <div id="map" style="width:100%; height:500px;"></div> --}}
                                <img src="/icon/orange_map_icon.png">급가속 구간
                                <img src="/icon/green_map_icon.png">급감속 구간
                                <img src="/icon/blue_map_icon.png">졸음 구간
                                <img src="/icon/red_map_icon.png">신고 구간
                        
                            </div>             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @else
    <p class="text-danger">운전 데이터가 없습니다.</p>
    @endif
    </div>
</section>
@endsection

@section('script')
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

<script>
    var API_KEY = "{{env('GCP_API_KEY')}}";     //GCP API KEY

    //최근 5일
    var day_5 = <?php echo json_encode($day_5)?>;
    //최근 5일의 위험정보         
    var day_5_danger_info = <?php echo json_encode($day_5_danger_info) ?>;  
    //최근 5일의 운전량
    var day_5_sec = <?php echo json_encode($day_5_sec) ?>;
    //최근 5일의 운전감지 정보
    var drive_detection_5 = <?php echo json_encode($drive_detection_5) ?>;
    // console.log(day_5);
    // console.log(day_5_danger_info);
    // console.log(day_5_sec);
    // console.log(drive_detection_5[0][0].latitude);
    //최근 5일동안 위험정보 빈도
    //i가 1부터 시작하는 것은 0이 count_danger(총 위험카운트)이기 때문
    var day_5_percent = [];
    //5일동안 총 위험카운트
    var day_5_danger_count = 0;
    for(var i = 0; i < day_5_danger_info.length; i++){
        day_5_danger_count+= day_5_danger_info[i]["count_danger"];
    }
    // console.log(day_5_danger_count);
    //5일 각각의 위험카운트(%)
    for(var i =0; i < day_5_danger_info.length; i++){
            
        day_5_percent.push(
            day_5_danger_info[i]["count_report"] + 
            day_5_danger_info[i]["count_sleep"] + 
            day_5_danger_info[i]["count_sudden_acceleration"] + 
            day_5_danger_info[i]["count_sudden_stop"] 
            );
        
    }
    // console.log(day_5_percent);
    //시간
    $(function() {	
		$('.datePicker').datepicker({
		    format: "yyyy-mm-dd",	//데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
		    // startDate: '-10d',	//달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
		    // endDate: '+10d',	//달력에서 선택 할 수 있는 가장 느린 날짜. 이후로 선택 불가 ( d : 일 m : 달 y : 년 w : 주)
		    autoclose : true,	//사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
		    calendarWeeks : false, //캘린더 옆에 몇 주차인지 보여주는 옵션 기본값 false 보여주려면 true
		    clearBtn : false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
		    // datesDisabled : ['2019-06-24','2019-06-26'],//선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
		    //daysOfWeekDisabled : [0,6],	//선택 불가능한 요일 설정 0 : 일요일 ~ 6 : 토요일
		    //daysOfWeekHighlighted : [3], //강조 되어야 하는 요일 설정
		    disableTouchKeyboard : false,	//모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
		    immediateUpdates: false,	//사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false 
		    multidate : false, //여러 날짜 선택할 수 있게 하는 옵션 기본값 :false 
		    multidateSeparator :",", //여러 날짜를 선택했을 때 사이에 나타나는 글짜 2019-05-01,2019-06-01
		    templates : {
		        leftArrow: '&laquo;',
		        rightArrow: '&raquo;'
		    }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징 
		    showWeekDays : true ,// 위에 요일 보여주는 옵션 기본값 : true
		    title: "제목",	//캘린더 상단에 보여주는 타이틀
		    todayHighlight : true ,	//오늘 날짜에 하이라이팅 기능 기본값 :false 
		    toggleActive : true,	//이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
		    weekStart : 0 ,//달력 시작 요일 선택하는 것 기본값은 0인 일요일 
		    language : "kr"	//달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
		});//datepicker end
	});//ready end

//예전 jQuery라면 on이 아니라 bind나 live 
$("#drive_date").on("propertychange change keyup paste input", function() {
    var drive_date = $('#drive_date').val();
    console.log(drive_date);
    $.ajax({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},  
        type: 'GET',
        url: `/info/${drive_date}/drive_score/`,
    }).then(function(data){
        console.log("asdf");
        window.location.href =`/info/${drive_date}/drive_score`;
    });
});
</script>
{{-- 라인 차트 --}}
<script src="/js/chart/chart-line.js"></script>
{{-- 도넛 차트 --}}
<script src="/js/chart/donut.js"></script>
{{-- 바 차트 --}}
<script src="/js/chart/chart-bar.js"></script>

<script>
//구글맵 API
var map;
function initMap() {
    var location = new Array();
    var location_color = new Array();
    //사고 = 빨간색
    //졸음 = 주황색
    //급가속 = 파랑색
    //급감속 = 초록색

    //점 0번째 인덱스는 선택한 날짜
    for(var i = 0; i < drive_detection_5[0].length; i++){
        location.push(new google.maps.LatLng(drive_detection_5[0][i].latitude, drive_detection_5[0][i].longitude));
        if(drive_detection_5[0][i].bool_report) location_color.push("red");
        else if(drive_detection_5[0][i].bool_sleep) location_color.push("orange");
        else if(drive_detection_5[0][i].bool_sudden_acceleration) location_color.push("blue");
        else if(drive_detection_5[0][i].bool_sudden_stop) location_color.push("green");
    }

    console.log(location_color);
    var mapCanvas = document.getElementById("map");
    var mapOptions = {center: location[0], zoom: 8}; //location[0]을 기준으로 12번 확대
    var map = new google.maps.Map(mapCanvas,mapOptions);

    for(var i in location){
    // var myCity = new google.maps.Circle({
    //     center: location[i],     //점찍는 위치
    //     radius: 3000,          //점크기
    //     strokeColor: location_color[i],   //점 테두리 색깔
    //     strokeOpacity: 1,     //점 테두리 밝기
    //     strokeWeight: 2,      //점 굵기
    //     fillColor: location_color[i],     //점 색깔
    //     fillOpacity: 0.5      //점 밝기
    // });
        var marker = new google.maps.Marker({
            position : location[i],
            icon: `/icon/${location_color[i]}_map_icon.png`,
            draggable: false,
            map: map
        });
        marker.setMap(map);
    }
}
</script>
<script src="/js/bootstrap-datepicker.kr.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key={{env('GCP_API_KEY')}}&callback=initMap&center" async defer></script>

@stop

@section('style')
<style>
    .sub_score_h1 {
        font-weight: 600;
        font-color: #222222;
        font-size: 20px;
    }
    .all_score_h1 {
        font-weight: 500;
        font-color: #222222;
        font-size: 48px;
    }
</style>
@endsection