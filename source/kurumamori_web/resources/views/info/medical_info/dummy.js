
    $("#add__past_sickness").click(function(){
        // console.log($('#insurance_bool_no').val());
        $('#insurance_table').css("display","none");
    });
    function add_past_sickness(){
        // 0,1 총 두번 추가가능
        if(past_sickness_count < 2){
            // console.log(past_sickness_count);
            const add = `@include('info.medical_info.past_sickness')`;
            // $(".abcde").text("aa");
            // console.log( $(".abcde")[0]);
            $("#form__past_sickness").append(add);

            $(".add__past_sickness")[past_sickness_count].innerHTML = `과거 질환${past_sickness_count + 1}`;
            $(".past_sickness")[past_sickness_count].name = `past_sickness${past_sickness_count + 1}`;
            $(".past_sickness_supplementation")[past_sickness_count].name = `past_sickness${past_sickness_count + 1}`;
            //처음에만 실행
            if(past_sickness_count == 0){
                $(".past_sickness_btn")[1].innerHTML = "선택";
                $(".past_sickness_btn")[0].className = `btn btn-default dropdown-toggle past_sickness_btn${past_sickness_count + 1} dropdown_btn`;
                $(".dropdown-past_sickness")[0].className = `dropdown-past_sickness${past_sickness_count + 1}`;
                $(`.past_sickness`)[0].className = `past_sickness${past_sickness_count + 1}`;
                console.log( $(".dropdown-past_sickness").length);
                var leng = $(".dropdown-past_sickness").length;    //해당 클래스 명을 가진 개수
                //위에 append해서 x2배가 됐으니 처음의 것만 클래스명 변경(dropdown-past_sickness1로)
                for(var i=0; i < leng /2 - 1; i++){
                    $(".dropdown-past_sickness")[0].className = `dropdown-past_sickness${past_sickness_count + 1}`;
                }
            }
            else{
                $(".past_sickness_btn")[0].innerHTML = "선택";
            }

            // console.log($(".past_sickness_btn")[0]);
            // $(".abcde")[past_sickness_count].
            // console.log(add.$("#abcde").text());
            past_sickness_count++;
            $(".past_sickness_btn")[0].className = `btn btn-default dropdown-toggle past_sickness_btn${past_sickness_count + 1} dropdown_btn`;
            $(".add__past_sickness")[past_sickness_count].innerHTML = `과거 질환${past_sickness_count + 1}`;
            $(".past_sickness")[past_sickness_count].name = `past_sickness${past_sickness_count + 1}`;
            $(".past_sickness_supplementation")[past_sickness_count].name = `past_sickness${past_sickness_count + 1}`;
            $(".past_sickness_supplementation")[past_sickness_count].value = null;
            $(`.past_sickness`)[0].className = `past_sickness${past_sickness_count + 1}`;
            // console.log( $(".past_sickness_btn"));

            var leng = $(".dropdown-past_sickness").length;    //해당 클래스 명을 가진 개수
            for(var i=0; i < leng; i++){
                $(".dropdown-past_sickness")[0].className = `dropdown-past_sickness${past_sickness_count + 1}`;
            }
            // $(".past_sickness_btn")[0].className = `btn btn-default dropdown-toggle past_sickness_btn${past_sickness_count + 1} dropdown_btn`;
        }
    }
    function add_past_sickness(){
        if(past_sickness_count < 4){
            console.log(past_sickness_count);
            const add = `
                <div class="col-md-1" ></div>
                <div class="col-md-2 text-center">
                    <p class="add__past_sickness"style="font-size:24px; margin-top:13px; color:blue;font-weight:800;">과거 질환${past_sickness_count}</p>
                </div>
                {{-- 드롭다운버튼 --}}
                <div class="col-md-2">
                    <button 
                        class="btn btn-default dropdown-toggle past_sickness_btn${past_sickness_count} dropdown_btn" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                            선택
                        <span class="caret"></span>
                    </button>
                    <div class="form-group {{ $errors->has('past_sickness${past_sickness_count}') ? 'has-error' : '' }}">
                        <input class="past_sickness${past_sickness_count}" style="font-size:10px"  name="past_sickness${past_sickness_count}" class="form-control"value="{{ old('past_sickness${past_sickness_count}')}}"/>
                        {!! $errors->first('past_sickness${past_sickness_count}', '<span class="form-error">:message</span>') !!}
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">없음</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">고혈압</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">당뇨</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">결핵</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">심장질환</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">알러지</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">천식</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">심부전증</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">페렴</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">디스크</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">간경화</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">관절염</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">협심증</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">암</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">갑상선염</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">고지혈증</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">골다공증</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">과민성 대장</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">기관지염</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">뇌졸중</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">신장질환</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">간암</a></li>
                        <li><a class="dropdown-past_sickness${past_sickness_count}" href="#" style="color:black; font-size:18px;">기타질환</a></li>
                    </ul>
                </div>
                {{--  --}}
                <div class="col-md-6">
                    <div class="form-group {{ $errors->has('past_sickness_supplementation${past_sickness_count}') ? 'has-error' : '' }}">
                        <input class="past_sickness_supplementation${past_sickness_count}" style="font-size:24px; width:100%;"type="text" name="past_sickness_supplementation${past_sickness_count}" class="form-control" placeholder="보충설명(복용 약물, 기간)" value="{{ old('past_sickness_supplementation1') }}"/>
                        {!! $errors->first('past_sickness_supplementation${past_sickness_count}', '<span class="form-error">:message</span>') !!}
                    </div>
                </div>
                <div class="col-md-1"></div>`;
            // $(".abcde").text("aa");
            // console.log( $(".abcde")[0]);
            $("#form__past_sickness").append(add);
            past_sickness_count++;
        }
    }