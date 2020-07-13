@extends('layouts.app')


@section('content')

<div class="container mt-5 pt-5">
    <h1 class="">글 쓰기</h1>
    <hr/>
    <form action="{{ route('questions.store') }}" method="POST">
        {!! csrf_field()!!}
        {!! \Log::info('questions form');!!}
        
        <div class="px-3">
            <div class="form-group">
                    <label class="" for="title {{$errors->has('title') ? 'has-error' : '' }}">제목</label>
                    <input class="form-control" type="text" id="title" name="title" value="{{ old('title', $question->title) }}"/>
                    {!! $errors->first('title','<span class="from-errors">:message</span>')!!}
            </div>
            <div>
                <select class="form-group form-control-sm" name="category_id" id="category_id">
                    @forelse($Categories as $Category)
                        @if (auth()->user()->id == 3)
                            @if ($Category->id !=7)
                                <option class="" value="{{$Category->id}}">{{$Category->category}}</option>
                            @endif
                        @else    
                            @if ($Category->id !=1 && $Category->id !=2 && $Category->id !=7)
                                <option class="" value="{{$Category->id}}">{{$Category->category}}</option>   
                            @endif
                        @endif
                    @empty
                    @endforelse
                </select>
            </div>
            <div class="form-group {{$errors->has('content') ? 'has-error' : '' }}">
                <label class="" for="">본문</label>
                <textarea class="form-control" name="content" id="content" cols="30" rows="10">{{ old('content', $question->content) }}</textarea>
                {!! $errors->first('content','<span class="from-errors">:message</span>')!!}
            </div>
        </div>
        <hr/>
        <div class="form-group d-flex justify-content-end pb-3">
            <span class="pr-3">
                <button class="btn btn-dark" type="submit">저장하기</button>
            </span>
            <span>
                <a class="btn btn-dark" href="{{route('questions.index')}}">뒤로가기</a>
            </span>
        </div>
    </form>
</div>

@endsection