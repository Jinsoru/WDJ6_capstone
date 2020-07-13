@extends('layouts.app')
{{-- @extends('layouts.user.info_menu') --}}

@section('content')


<!-- intro section -->
<section id="intro" class="section intro" style="padding: 50px 0px 0px 0px; background-color:	rgb(247, 247, 247)">
    <div class="row">

        <div class="col-md-2 col-xs-2 col-sm-2">
            @include('layouts.partial.info_menu')
        </div>
        <div class="col-md-8 col-xs-8 col-sm-8">
            <br />
            <br />
            <h3>개인 정보</h3>
            <div class="row">
                <div class="col-sm-6 col-md-3">
                    <div class="thumbnail">
                        <div class="caption">
                            <h3 class="text-center">유저 정보</h3>
                            <hr style="background-color:darkgrey;">
                            <p style="font-size:20px"><b>이메일</b> : {{$user->email}}</p>
                            <p style="font-size:20px"><b>이름</b> : {{$user->name}}</p>
                            <p style="font-size:20px"><b>생년월일</b> : {{$user->birth}}</p>
                            <p style="font-size:20px"><b>성별</b> : {{$user->gender}}</p>
                            <p style="font-size:20px"><b>휴대폰 번호</b> : {{$user->phone}}</p>
                            <!-- Button trigger modal -->
                            {{-- <button type="button" class="btn btn-success" data-toggle="modal" data-target="#userModal">
                                수정하기
                            </button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#userModal">
                                상세보기
                            </button> --}}
                            @include('info.user.user_modal',compact('user'))
                            <hr style="background-color:darkgrey;" />
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-5">
                        <div class=" thumbnail">
                            <div class="caption">
                                <h3 class="text-center">신고 이력 </h3>
                                <hr style="background-color:red;">
                                {{-- 신고 이력 --}}
                                @forelse($reports as $report)
                                <div class="row">
                                    <div class="col-sm-6 col-md-6">
                                        <p>접수날짜 : {{$report->created_at}}</p>
                                    </div>
                                    <div class="col-sm-6 col-md-6">
                                        <p class="gps{{$report->id}}"></p>
                                    </div>
                                    {{-- 위도 경도로 주소찾기 --}}
                                    <script>
                                        var gps = "";
                                        var API_KEY = "{{env('GCP_API_KEY')}}";
                                        var latitude = "{{$report->latitude}}";
                                        var longitude = "{{$report->longitude}}";
                                        // console.log(latitude);
                                        // console.log(longitude);

                                        new Promise(function(resolve, reject) {
                                            resolve(
                                                $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
                                                function(data) {
                                                    console.log(data);
                                                    gps = data.results[0].formatted_address;
                                                    console.log(gps);
                                                    $(`.gps{{$report->id}}`).text(gps);
                                            }));
                                        });
                                        // $(`.gps{{$report->id}}`).text("api쓰는거라 실제 쓸때 위에 주석 푸셈");
                                    </script>

                                </div>
                                {{-- 신고 이력이 없을 경우 --}}
                                @empty
                                <p class="text-center text-danger" style="font-size:20px">이력이 없습니다.</p>
                                @endforelse
                                <p class="text-danger">최근 3건만 표시됩니다.</p>
                            </div>
                            <hr style="background-color:red;">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="thumbnail">
                            <div class="caption">
                                <h3 class="text-center">제품 등록 정보</h3>
                                <hr style="background-color:green;">
                                @if($product)
                                {{-- <p id="text_product_name">제품 명 : {{$product->product_name}}</p> --}}
                                <p id="text_product_key" style="font-size:20px"><b>제품키</b> : {{$product->product_key}}</p>
                                <p id="text_product_date_buy" style="font-size:20px"><b>구입날짜</b> : {{$product_buy->created_at}}</p>
                                <p id="text_product_date_as" style="font-size:20px"><b>무상 AS기한</b> : 구입 후 1년까지</p>
                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#productModal">
                                    제품 재등록
                                </button>
                                <button type="button" class="btn btn-primary btn__delete__product">
                                    제품 삭제
                                </button>
                                {{-- <button class="btn btn-primary">등록하기</button> --}}
                                @else
                                <p class="text-center text-danger">등록한 제품이 없습니다.</p>
                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#productModal">
                                    제품 등록
                                </button>
                                @endif
                                @include('info.user.product_modal')
                            </div>
                            <hr style="background-color:green;">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="thumbnail">
                            <div class="caption">
                                <h3 class="text-center">문의 이력 </h3>
                                <table class="table" style="border-top: 3px solid blue; border-bottom: 3px solid blue;">
                                    <thead>
                                        <tr>
                                            <th class="text-center" scope="col" style="font-size:20px">#</th>
                                            <th class="text-center" scope="col" style="font-size:20px">제목</th>
                                            <th class="text-center" scope="col" style="font-size:20px">카테고리</th>
                                            <th class="text-center" scope="col" style="font-size:20px">작성날짜</th>
                                            <th class="text-center" scope="col" style="font-size:20px">조회수</th>
                                            <th class="text-center" scope="col" style="font-size:20px">대답여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @for($i = 0; $i < count($boards); $i++)
                                            <tr onClick="location.href='/boards/{{$board_categories[$i]->category=="유저리뷰" ? "reviews" : "questions"}}/{{$boards[$i]->id}}'">
                                                <th class="text-center" scope="row">{{$boards[$i]->id}}</th>
                                                <td class="text-center">{{$boards[$i]->title}}</td>
                                                <td class="text-center">{{$board_categories[$i]->category}}</td>
                                                <td class="text-center">{{$boards[$i]->created_at}}</td>
                                                <td class="text-center">{{$boards[$i]->view_count}}</td>
                                                
                                                @if($board_comment[$i])
                                                <td class="text-center">O</td>
                                                @else 
                                                <td class="text-center">X</td>
                                                @endif
                                            </tr>
                                        {{-- @empty 
                                        <p class="text-center text-danger">이력이 없습니다.</p> --}}
                                        @endfor
                                        <br />

                                    </tbody>
                                </table>
                            <p class="text-danger">최근 5건만 표시됩니다.</p>

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="thumbnail">
                            <div class="caption">
                                <h3 class="text-center">제품 구매 정보</h3>
                                <hr style="background-color:green;">
                                @if(count($user_product_buy_key))
                                    @for($i = 0; $i < count($user_product_buy_key); $i++)
                                        {{-- <p id="text_product_name">제품 명 : {{$product->product_name}}</p> --}}
                                        <p id="text_product_buy_key" style="font-size:20px"><b>구매한 제품 키{{$i + 1}} </b> : {{$user_product_buy_key[$i]->product_key}}</p>
                                        {{-- <p id="text_product_buy_date_buy" style="font-size:20px"><b>구입날짜</b> : {{$product_buy->created_at}}</p>
                                        <p id="text_product_buy_date_as" style="font-size:20px"><b>무상 AS기한</b> : 구입 후 1년까지</p> --}}
                                        
                                        {{-- <button class="btn btn-primary">등록하기</button> --}}
                                    @endfor
                                @else
                                <p class="text-center text-danger">구매한 제품이 없습니다.</p>
                                @endif
                            </div>
                            <hr style="background-color:green;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</section>
@endsection

@section('script')
<script>
//제품 등록
$(document).on('click', '.btn__post__product', function(e) {
    var product_key = $('#product_key');
    console.log(product_key);
    $.ajax({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},  
        type: 'POST',
        url: '/products',
        dataType: 'json',
        data: product_key
    }).then(function (data){
        console.log(data);
        try{
            alert(`${data[0].product_key}로 등록되었습니다.`);
            window.location.href = '/info/index';
        }
        catch(error){
            console.log(error);
        $('#ex_text').text(`잘못된 키이거나 이미 사용한 키입니다.`);
        }
    });
});

//제품 삭제
$(document).on('click', '.btn__delete__product', function(e) {
    var product_id = '@if($product) {{$product->id}} @else null @endif';
    if(confirm("제품을 삭제하시겠습니까?")){
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},  
            type: 'DELETE',
            url: '/products/' + product_id,
            dataType: 'json',
        }).then(function (data){
            console.log(data);
            alert(`제품이 삭제되었습니다.`);
            window.location.href = '/info/index';
        });
    }
});
//제품 수정
$(document).on('click', '.btn__update__product', function(e) {
        var product_id = '@if($product) {{$product->id}} @else null @endif';
        console.log(product_id);
        var product_key = $('#product_key');
        var past_product_key = $('#text_product_key');
        console.log(product_key);
    $.ajax({
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},  
        type: 'PUT',
        url: '/products/' + product_id,
        dataType: 'json',
        data : product_key
    }).then(function (data){
        console.log(data);
        if(data){
            alert(`재등록되었습니다.`);
            window.location.href = '/info/index';
        }
        else{
            $('#ex_text').text(`잘못된 키이거나 이미 사용한 키입니다.`);
        
        }
    });
});


</script>
@stop