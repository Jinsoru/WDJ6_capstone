@extends('layouts.app')

@section('content')
<style>
</style>
<div class="container mt-5 pt-5">
    <h1 class="">글 쓰기</h1>
    <hr/>
    <form action="{{ route('reviews.store') }}" method="POST">

        {!! \Log::info('reviews form')!!}
        
        <div class="form-group">
            <label class="" for="title {{$errors->has('title') ? 'has-error' : '' }}">제목</label>
            <input class="form-control" type="text" id="title" name="title" value="{{ old('title', $review->title) }}"/>
            {!! $errors->first('title','<span class="from-errors">:message</span>')!!}
        </div>
        <div>
            <select class="form-group form-control-sm" name="category_id" id="category_id">
                <option class="" value="7">{{\App\Category::find(7)->category}}</option>
            </select>
        </div>
        <div class="form-group {{$errors->has('content') ? 'has-error' : '' }}">
            <label class="" for="">본문</label>
            <textarea class="form-control" name="content" id="content" cols="30" rows="10">{{ old('content', $review->content) }}</textarea>
            {!! $errors->first('content','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group d-flex justify-content-end pb-3">
            <span class="pr-3">
                <button class="btn btn-dark" type="submit">저장하기</button>
            </span>
            <span>
                <a class="btn btn-dark" href="{{route('reviews.index')}}">뒤로가기</a>
            </span>
        </div>
    </form>
</div>

@endsection