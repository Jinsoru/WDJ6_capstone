@extends('layouts.app')

@section('content')
<div class="wrapper">

    <div class="confirm_box">

        <form action="{{ route('confirm.store') }}" method="POST" role="form" class="confirm_form">
            {!! csrf_field() !!}

            <div class="page-header">
                <a class="logo" href="/">
                    <image src="/icon/logo_curumamori.png" width="350px"></image>
                </a>
                <h2>승인코드 입력</h2>
            </div>
            <br/>

            <br/>
            <h5 style="color:black">이메일로 보낸 승인코드를 입력해 주세요</h5>


            <div class="form-group {{$errors->has('confirm_code') ? 'has-error' : ''}}">
                <input type="confirm_code" name="confirm_code" class="form-control" placeholder="승인코드" />
                {!! $errors->first('confirm_code', '<span class="form-error">:message</span>')!!}

            <div class="form-group">
                <button class="btn btn-primary btn-lg btn-block" type="submit">
                    확인
                </button>
            </div>
        </form>

    </div>

</div>

@stop
@section('style')
<style>
    .wrapper {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .confirm_box {
        margin-top: 150px;
        text-align: center;
        border: 1px solid #e6e6e6;
        border-radius: 0px;
        background-color: white;
        width: 100%;
        max-width: 500px;
    }

    .confirm_form {
        padding: 40px;
        padding-bottom: 30px;
        margin-bottom: 15px;
    }
</style>
@endsection