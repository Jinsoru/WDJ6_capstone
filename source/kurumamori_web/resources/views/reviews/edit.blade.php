@extends('layouts.app')


@section('content')
<style>
</style>
<div class="container mt-5 pt-5">
    <h1 class="">글 쓰기</h1>
    <hr/>
    <form action="{{ route('reviews.update', $review) }}" method="POST">
        {!! csrf_field()!!}
        {!! method_field('PUT') !!}

        {!! \Log::info('reviews form');!!}
        
        <div class="form-group">
            <label class="" for="title {{$errors->has('title') ? 'has-error' : '' }}">제목</label>
            <input class="form-control" type="text" id="title" name="title" value="{{ old('title', $review->title) }}"/>
            {!! $errors->first('title','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group {{$errors->has('content') ? 'has-error' : '' }}">
            <label class="" for="">본문</label>
            <textarea class="form-control" name="content" id="content" cols="30" rows="10">{{ old('content', $review->content) }}</textarea>
            {!! $errors->first('content','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group">
            <button class="btn btn-dark" type="submit">저장하기</button>
            <a class="btn btn-dark" href="{{route('reviews.show',compact('review'))}}">뒤로가기</a>
        </div>
    </form>
</div>

@endsection