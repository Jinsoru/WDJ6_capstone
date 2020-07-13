@extends('layouts.app')


@section('content')
<style>
</style>
<div class="container mt-5 pt-5">
    <h1 class="">글 쓰기</h1>
    <hr/>
    <form action="{{ route('questions.update', $question) }}" method="POST">
        {!! csrf_field()!!}
        {!! method_field('PUT') !!}

        {!! \Log::info('questions form');!!}
        
        <div class="form-group">
            <label class="" for="title {{$errors->has('title') ? 'has-error' : '' }}">제목</label>
            <input class="form-control" type="text" id="title" name="title" value="{{ old('title', $question->title) }}"/>
            {!! $errors->first('title','<span class="from-errors">:message</span>')!!}
        </div>
        {{-- <div>
            <select class="form-group form-control-sm" name="category" id="category">
                @forelse($Categories as $Category)
                    <option class="" value="{{$Category->category}}">{{$Category->category}}</option>
                @empty
                @endforelse
            </select>
        </div> --}}
        <div class="form-group {{$errors->has('content') ? 'has-error' : '' }}">
            <label class="" for="">본문</label>
            <textarea class="form-control" name="content" id="content" cols="30" rows="10">{{ old('content', $question->content) }}</textarea>
            {!! $errors->first('content','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group">
            <button class="btn btn-dark" type="submit">저장하기</button>
            <a class="btn btn-dark" href="{{route('questions.show',compact('question'))}}">뒤로가기</a>
        </div>
    </form>
</div>

@endsection