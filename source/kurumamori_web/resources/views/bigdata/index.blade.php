@extends('layouts.app')

@section('content')
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
<!-- home.blade -->
@include('bigdata.main')
@endsection

@section('script')
<!-- chart.js파일 불러오기 -->
<script src="/js/bigdata/bigdata-chart.js"></script>
@endsection