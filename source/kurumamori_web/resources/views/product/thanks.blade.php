@extends('layouts.app')

@section('content')
<br>
<br>
<br>
<br>
<br>
<h1 style="text-align:center;">구매해주셔서 감사합니다.</h1>
<div style="text-align:center; margin:20px;">
    <a href="/" class="btn btn-primary">홈으로 가기</a>
    <a href="/info/index" class="btn btn-info">제품 등록하러 가기</a>
</div>
<table border="1" style="width:100%; margin-top:30px; margin-bottom:30px;">
    <th>제품</th>
    <th>받으시는 분</th>
    <th>연락처</th>
    <th>주소</th>
    <th>배송메시지</th>
    <th>제품 키</th>
    <th>수량</th>
    <th>총 금액</th>
    <tr> 
        <td>
            <img src="product/product_image.jpg" alt="" style="width:300px; height:200px;">
        </td>
        <td>{{$buy->to_name}}</td>
        <td>{{$buy->to_phone}}</td>
        <td>{{$buy->to_address}}</td>
        <td>{{$buy->to_msg}}</td>
        <td>{{$buy->product_key}}</td>
        <td>{{$buy->ea}}</td>
        <td>{{$buy->price}}</td>
    </tr>
</table>
@stop
@section('script')
@stop
@section('style')
@stop