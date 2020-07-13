@extends('layouts.app')

@section('content')
<!-- intro section -->
<section id="intro" class="section intro" style="padding: 50px 0px 0px 0px; background-color:rgb(247, 247, 247)">
    <div class="row">
        <div class="col-md-2 col-xs-2 col-sm-2">
            @include('layouts.partial.info_menu')
        </div>
        <div class="col-md-7">
            <br />
            <br />
            <h3 style="color:blue">의료 정보</h3>
            {{-- 의료정보 있을 경우의 페이지 --}}
            @if($update_form)
                @include('info.medical_info.no_medical')
            @elseif($medical_info)
                @include('info.medical_info.yes_medical')
            @else
                @include('info.medical_info.no_medical')
            @endif
        </div>
    </div>
</section>

@stop

@section('script')
<script>
    var past_sickness_count = "{{ isset($past_sickness) && count($past_sickness) ? count($past_sickness) + 1 : 2}}";
    var sickness_count = "{{ isset($sickness) && count($sickness) ? count($sickness) + 1 : 2}}";
    console.log(past_sickness_count);
    console.log(sickness_count);
    //예전 질병
    $(`.dropdown-past_sickness1`).click(function(){
        console.log("dropdown-past_sickness1");
        $(`.past_sickness_btn1`).html($(this).text() + ' <span class="caret"></span>');
        console.log
        // $('.past_sickness_btn').val($(this).data('value'));
        $(`.past_sickness_name1`).val($(`.past_sickness_btn1`).text());
    });
    $(`.dropdown-past_sickness2`).click(function(){
        console.log("dropdown-past_sickness2");
        $(`.past_sickness_btn2`).html($(this).text() + ' <span class="caret"></span>');
        console.log
        // $('.past_sickness_btn').val($(this).data('value'));
        $(`.past_sickness_name2`).val($(`.past_sickness_btn2`).text());
    });
    $(`.dropdown-past_sickness3`).click(function(){
        console.log("dropdown-past_sickness3");
        $(`.past_sickness_btn3`).html($(this).text() + ' <span class="caret"></span>');
        console.log
        // $('.past_sickness_btn').val($(this).data('value'));
        $(`.past_sickness_name3`).val($(`.past_sickness_btn3`).text());
    });
   
    //현재 질병
    $(".dropdown-sickness1").click(function(){
        
        $('.sickness_btn1').html($(this).text() + ' <span class="caret"></span>');
        // $('.sickness_btn').val($(this).data('value'));
        $('.sickness_name1').val($('.sickness_btn1').text());

    });
    $(".dropdown-sickness2").click(function(){
        
        $('.sickness_btn2').html($(this).text() + ' <span class="caret"></span>');
        // $('.sickness_btn').val($(this).data('value'));
        $('.sickness_name2').val($('.sickness_btn2').text());

    });
    $(".dropdown-sickness3").click(function(){
        
        $('.sickness_btn3').html($(this).text() + ' <span class="caret"></span>');
        // $('.sickness_btn').val($(this).data('value'));
        $('.sickness_name3').val($('.sickness_btn3').text());

    });
    //혈액형
    $(".dropdown-blood_type").click(function(){
        //
        $('.blood_type_btn').html($(this).text() + ' <span class="caret"></span>');
        // $('.blood_type_btn').val($(this).data('value'));
        $('#blood_type').val($('.blood_type_btn').text());

    });
    //보험명
    $(".dropdown-insurance_name").click(function(){
        $('.insurance_name_btn').html($(this).text() + ' <span class="caret"></span>');
        // $('.blood_type_btn').val($(this).data('value'));
        $('#insurance_name').val($('.insurance_name_btn').text());
    })

    //보험 : 예 클릭시
    $("#insurance_bool_yes").click(function(){
        // console.log($('#insurance_bool_yes').val());
        $('#insurance_table').css("display","flex");
    });
    //보험 : 발리데이션으로 old값으로 yes가 떠있을 때 자동으로 열게
    if($("#insurance_bool_yes").is(":checked")){
        $('#insurance_table').css("display","flex");
    }
    //보험 : 아니오 클릭시
    $("#insurance_bool_no").click(function(){
        // console.log($('#insurance_bool_no').val());
        $('#insurance_table').css("display","none");
    });

    function add_past_sickness(){
        if(past_sickness_count >= 4){
            return null;
        }
        $(`#form__past_sickness${past_sickness_count}`).css("display","flex");
        past_sickness_count++;

    }
    function add_sickness(){
        if(sickness_count >= 4){
            return null;
        }
        $(`#form__sickness${sickness_count}`).css("display","flex");
        sickness_count++;

    }
    function delete_past_sickness(){
        $(`#form__past_sickness${past_sickness_count-1}`).css("display","none");
        $(`.past_sickness_btn${past_sickness_count-1}`).text("선택");
        $(`.past_sickness_name${past_sickness_count-1}`).val("");
        past_sickness_count--;

    }
    function delete_sickness(){
        
        $(`#form__sickness${sickness_count -1}`).css("display","none");
        $(`.sickness_btn${sickness_count -1}`).text("선택");
        $(`.sickness_name${sickness_count -1}`).val("");
        sickness_count--;
    }

    
    //
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
</script>
<script src="/js/bootstrap-datepicker.kr.js"></script>

@stop

@section('style')
<link rel="stylesheet" href="/css/info/dropdown_menu.css">
<style>
    /* .blood_type_btn {
        width:120px; 
        height:40px; 
        border: solid 1px black; 
        margin-top:2px; 
        margin-right:20px;
    } */
    .dropdown_btn {
        width:120px; 
        height:40px; 
        border: solid 1px black; 
        margin-top:2px; 
        margin-right:20px;
    }
    .medical_text {
        color : black;
        font-size : 24px;
        font-weight: 800;   
    }

    .card-main {
        background-color : #002ef0
    }

</style>
@endsection