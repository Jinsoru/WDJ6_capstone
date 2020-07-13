{{-- <p class="text-danger" style="font-size:20px; margin-left:180px;">총 점수는 급 가속, 급 감속 점수 뿐 아니라 졸음, 사고점수도 포함한 점수입니다.</p> --}}
<div class="row">
    <div class="col-xs-3 col-sm-3 col-md-3">
        <div class="card btn btn-primary text-dark"> <!-- 총 점수 -->
            <div class="pt-3 pb-3">
                {{-- @if --}}
                @if( ($score[0] + $score[1] + $score[2] + $score[3]) / count($score) >= 90)
                    <img src="/icon/모범.png">
                @elseif( ($score[0] + $score[1] + $score[2] + $score[3]) / count($score) >= 50)
                    <img src="/icon/양호.png">
                @else
                    <img src="/icon/주의.png">
                @endif
            </div>
            <h1 class="pb-3 all_score_h1">총 점수</h1>
            <h1 class="pb-3 all_score_h1">{{($score[0] + $score[1] + $score[2] + $score[3]) / count($score)}}점</h1>
        </div>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2">
        <div class="card btn btn-primary text-dark"> <!-- 급 가속 점수 -->
            <div class="pt-3 pb-3">
                 @if($score[0] >= 90)
                    <img src="/icon/모범.png">
                @elseif($score[0] >= 50)
                    <img src="/icon/양호.png">
                @else
                    <img src="/icon/주의.png">
                @endif
            </div>
            <h1 class="pb-3 sub_score_h1">급 가속 점수</h1>
            <h1 class="pb-3 sub_score_h1">{{$score[0]}}점</h1>

        </div>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2">
        <div class="card btn btn-primary text-dark"> <!-- 급 감속 점수 -->
            <div class="pt-3 pb-3">
                 @if($score[1] >= 90)
                    <img src="/icon/모범.png">
                @elseif($score[1] >= 50)
                    <img src="/icon/양호.png">
                @else
                    <img src="/icon/주의.png">
                @endif
            </div>
            <h1 class="pb-3 sub_score_h1"> 급 감속 점수</h1>
            <h1 class="pb-3 sub_score_h1">{{$score[1]}}점</h1>

        </div>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2">
        <div class="card btn btn-primary text-dark"> <!-- 졸음 점수 -->
            <div class="pt-3 pb-3">
                {{-- @if --}}
                @if($score[2] >= 90)
                    <img src="/icon/모범.png">
                @elseif($score[2] >= 50)
                    <img src="/icon/양호.png">
                @else
                    <img src="/icon/주의.png">
                @endif
            </div>
            <h1 class="pb-3 sub_score_h1">졸음 점수</h1>
            <h1 class="pb-3 sub_score_h1">{{$score[2]}}점</h1>
        </div>
    </div>
    <div class="col-xs-2 col-sm-2 col-md-2">
        <div class="card btn btn-primary text-dark"> <!-- 사고 점수 -->
            <div class="pt-3 pb-3">
                {{-- @if --}}
                @if($score[3] >= 90)
                    <img src="/icon/모범.png">
                @elseif($score[3] >= 50)
                    <img src="/icon/양호.png">
                @else
                    <img src="/icon/주의.png">
                @endif
            </div>
            <h1 class="pb-3 sub_score_h1">사고 점수</h1>
            <h1 class="pb-3 sub_score_h1">{{$score[3]}}점</h1>
        </div>
    </div>
    <div class="col-xs-1 col-sm-1 col-md-1"></div>
</div>
<br/>