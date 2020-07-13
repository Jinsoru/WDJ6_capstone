@extends('layouts.app')

@section('content')
<br>
<br>
<br>
<br>
<br>
<div id="product">
    <div style="display:flex; justify-content:center; margin-bottom:30px;">
        <label class="btn-intro" @click='checkTrue'>제품소개</label>
        <label class="btn-intro" @click='checkFalse'>제품구매</label>
    </div>
    <hr>

    <div v-if='check'>
        <div class="div-main">
        <img src="product/logo.jpg" style="width:30%;"></img>
        <hr>
        <div class="div-intro">
            <img class="content-img" style="width:30%; height:20%; text-align:center; padding-left:5%;" src="product/product_image.jpg"></img>
            <div>
                <p class="text-p" style="padding-left: 10%">
                교통사고의 주된 원인이 되고있는 졸음운전 방지, 전방주시 태만 저희 KURUMAMORI 119가 감지하여 예방하여 드립니다.
                디바이스에 장착된 카메라가 운전자를 감지하여 졸음운전과 전방주시태만, 급가속 급정거가 감지되면 안내 음성을 통해 경고를 드려 예방할 수 있도록 합니다.
                디바이스에 장착된 센서가 사고를 스스로 감지하여 30초 이내에 119에 SMS를 통해 자동으로 사고를 접수합니다.
    목숨을 위협하는 사고 발생 시 사고자가 직접 사고 신고를 하는 것은 거의 불가능합니다.
    목숨이 경각에 달린 긴급 사고가 발생할 경우 신속한 초동대처가 필수적인데 빠른 대처를 위해서는 사고 즉시 신고가 접수 될 수 있도록 해야 합니다.
    KURUMAMORI 119의 자동 신고 시스템은 초동 대처를 용이하게 하여 사고자의 골든 타임을 놓치지 않아 생존 가능성을 비약적으로 높일 수 있습니다.</p>
            </div>
        </div>
        <hr>
        <div  style="text-align:center;">
            <div class="div-text">
                <img class="content-img" src="product/sleep.jpg"></img>
                <p class="text2-p">졸음운전감지는 하드웨어의 카메라를 통해 운전자가 눈을 뜨고있는지 감고있는지 감지합니다. 그 후 알고리즘에 의해 졸음운전이라 판단되면 음성 경고를 제공합니다.</p>
            </div>
            <br>
            <div class="div-text">
                <img class="content-img" src="product/danger.jpg"></img>
                <p class="text2-p">전방 주시 감지는 하드웨어의 카메라를 통해 운전자의 시선을 추적하여 전방을 보는지 아닌지를 감지합니다. 그 후 알고리즘을 통해 전방 주시 태만으로 판단되면 음성 경고를 제공합니다. </p>            
            </div>
            <br>
            <div class="div-text">
                <img class="content-img" src="product/resque.jpg"></img>
                <p class="text2-p">자동 신고 서비스는 돌발적으로 발생하는 사고 상황을 하드웨어가 판단하여 자동으로 119에 신고해주는 서비스입니다.</p>
                <p class="text2-p">사고가 발생하면 경보가 울리게 되는데 제한시간내에 운전자가 하드웨어의 취소버튼을 누르지 않으면 운전자가 취소를 할 수 없는 상태로 판단하여 자동으로 119에 신고를 하게 됩니다.</p>
                <p class="text2-p"> 신고 시 등록했던 의료 정보와 현재 사고 위치 정보를 함께 119에 전송함으로써 현장 출동의 골든 타임이 보장될 수 있도록 돕습니다. </p>
            </div>
        </div>
        <hr>
        <div style="text-align:center;">
            <img src="product/nagare.jpg" style="width:80%;" alt="">
        </div>
    </div>
    </div>
    <div v-else>
        <div>
        <div class="buy-main" style="height:400px;">
            <div style="width:50%;">
                <img src="product/product_image.jpg" class="buy-img"></img>
            </div>
            <div>
                <form action="buy" method="GET">
                    <h2 class="buy-title">KURUMAMORI 119</h2>
                    <p class="buy-intro">내 차가 사고를 스스로 예방하고 사고를 스스로 신고한다!</p>
                    <h4 class="my-price">49,900원</h4>
                    <button class="btn-buy">구매하기</button>
                </form>
            </div>
        </div>
    </div>
    </div>
</div>
<br>
<br>
<br>
<br>
<br>

@stop
@section('script')
<script src="https://unpkg.com/vue"></script> <!-- Vue.js 라이브러리 import-->

<script>
        const webStore= new Vue(
            {
                el:"#product",
                data:{
                    check:true,
                },
                methods:{
                    checkTrue: function(){
                        this.check = true; 
                        console.log("True: ",this.check);
                    },
                    checkFalse:function(){
                        this.check = false;
                        console.log("False",this.check);
                    }
                }
            }
        )
    </script>
@stop
@section('style')
<style>
    /* 구매화면 css */
    .buy-main{
    display: flex;
    }
    .buy-img{
        width:70%;
        height:120%;
        margin-right: 30px;
        margin-top: 10px;
        margin-left: 100px;
    }
    .buy-intro{
        margin-top:50px;
        height: 200px;
        color:black;

    }
    .btn-intro{
        width:100px;
        height:40px;
        line-height:40px;
        text-align:center;
        background-color: white;
        border: 1px solid black;
        border-radius: 5px;
        margin-right:10px;
    }
    .btn-intro:hover{
        background-color: black;
        color:white;
    }
    .btn-buy{
        width: 200px;
        height: 50px;
        background-color: white;
        border: 1px solid black;
        border-radius: 10px;
    }
    .btn-buy:hover{
        background-color: black;
        color:white;
    }
    .buy-title{
        text-align: center;
    }

    /* 소개화면 css */
    .div-main{
    text-align: center;
    }
    .text-p{
       color:black; line-height:40px; height:400px; width:90%;
       margin-top:30px;
       font-size: 16px;
       font-weight: 500;
    }
    .text2-p{
        color:black;
    }
    .div-intro{
        display: flex;
        margin-left: 50px;
        margin-right: 50px;
        align-self: center;
        text-align: center;
    }
    .img-product{
        width: 50%;
        /* height: 500px; */
        margin-bottom: 20px;
    }
    .img-func{
        width: 50%;
        margin-left: 50px;
    }
    .div-text{
        text-align:center;
    }
    .div-good{
        /* border:1px solid black; */
        /* border-radius: 10px; */
        width: 40%;
        /* margin-right: 20px; */
    }
    .div-func{
        display: flex;
    }
    .div-func>p{
    margin-left: 30px;
    width:40%;
    }
    .img-work{
        width: 90%;
    }

    .content-img{
        width:70%;
    }
</style>