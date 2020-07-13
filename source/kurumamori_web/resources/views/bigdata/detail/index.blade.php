@extends('layouts.app')

@section('content')
<section id="intro" class="section intro" style="padding: 50px 0px 0px 0px; background-color:#F0F0F0">
    {{-- 구글맵 --}}
    <div class="container px-3 py-5 p-md-5">
        <div class="card">
            <div class="card-header">
                @if($option == "sleep")
                    최근 7일간의 졸음운전 위치
                @elseif($option == "sudden")
                    최근 7일간의 급가속, 급정거 위치
                @else
                    최근 7일간의 사고 위치
                @endif
            </div>
            <div class="card-body">
                <div id="map" style="width:100%; height:500px;"></div>
                @if($option == "sleep")
                    <img src="/icon/blue_map_icon.png">졸음 구간
                @elseif($option == "sudden")
                    <img src="/icon/orange_map_icon.png">급가속 구간
                    <img src="/icon/green_map_icon.png">급감속 구간
                @else
                    <img src="/icon/red_map_icon.png">신고 구간
                @endif
            </div>
        </div>
    </div>
    {{-- 차트 --}}
    @include("bigdata.chart.{$option}")
</section>
@endsection

@section('script')
<script>
var bigdata_age = <?php echo json_encode($bigdata_age) ?>;
var bigdata_time = <?php echo json_encode($bigdata_time) ?>;
var day_7 = <?php echo json_encode($day_7) ?>;
var time_set = <?php echo json_encode($time_set) ?>;
</script>

<!-- chart.js파일 불러오기 -->
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
    var drive_detection_7 = <?php echo json_encode($drive_detection_7) ?>;
    var option = "{{$option}}"
    // console.log(option);
    //점
    for(var i = 0; i < drive_detection_7.length; i++){
        if(drive_detection_7[i] != null){
            for(var j = 0; j < drive_detection_7[i].length; j++){

                location.push(new google.maps.LatLng(drive_detection_7[i][j].latitude, drive_detection_7[i][j].longitude));
                if(drive_detection_7[i][j].bool_sleep && option == "sleep") location_color.push("blue");                     //신고 : red
                else if(drive_detection_7[i][j].bool_report && option == "accident") location_color.push("red");                     //신고 : red
                else if(drive_detection_7[i][j].bool_sudden_acceleration && option == "sudden") location_color.push("orange");  //가속 : orange
                else if(drive_detection_7[i][j].bool_sudden_stop && option == "sudden") location_color.push("green");         //감속 : green
            }
        }
        
    }
    // console.log(location);
    // console.log(location_color);
    var mapCanvas = document.getElementById("map");
    var mapOptions = {center: location[0], zoom: 8}; //location[0]을 기준으로 12번 확대
    var map = new google.maps.Map(mapCanvas,mapOptions);

    for(var i = 0; i < location.length; i++){
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
<script src="https://maps.googleapis.com/maps/api/js?key={{env('GCP_API_KEY')}}&callback=initMap&center" async defer></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<script src="/js/bigdata/chart_sleep.js"></script>
<script src="/js/bigdata/chart_sudden.js"></script>
<script src="/js/bigdata/chart_accident.js"></script>
@endsection