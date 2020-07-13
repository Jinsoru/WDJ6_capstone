@extends('layouts.app')
@section('content')
<style>
  .question-show-home{
    font-size: 1.5em;
    font-weight: 700;
  }
  .question-show-home:hover{
    text-shadow: 0 0 24px #002Ef0;
  }
  .question-show-home:link{
    color: black;
    text-decoration:none;
  }
  .question-show-home:visited{
    color: black; 
    text-decoration:none;
  }
  .question-show-slicer{
    font-size: 1.5em;
    font-weight: 700;
  }
  .question-show-category{
    font-size: 1.4em;
    font-weight: 700;
  }
  .question-show-category:hover{
    text-shadow: 0 0 24px #002Ef0;
  }
  .question-show-category:link{
    color: black;
    text-decoration:none;
  }
  .question-show-category:visited{
    color: black; 
    text-decoration:none;
  }
  .question-show-split{
    background-color: black;
  } 
  .question-show-title{
    font-size: 2em;
    font-weight: 700;
  }
  .question-show-name{
    font-size: 1em;
  }
  .question-show-name:hover{
    text-shadow: 0 0 24px #002Ef0;
  }
  .question-show-name:link{
    color: black;
    text-decoration:none;
  }
  .question-show-name:visited{
    color: black;
    text-decoration:none;
  }
  .question-show-content{
    font-size: 1.25em;
  }
  .btn-point{
    color: white;
    background-color: #002Ef0;
  }
  .btn-point:hover{
    color: white;
    background-color: #23272B;
    border: 1px solid #002Ef0;
  }
</style>
<div class="container mt-5 pt-5">
  <header>
    <span><a class="question-show-home" href="{{route('questions.index')}}">HOME</a></span>
    <span class="question-show-slicer">></span>
    <span >
      <a class="question-show-category" href="{{route('questions.index',['category_id'=>$category])}}">{{ \App\Category::find($category)->category }}</a>
    </span>
  </header>
  <hr class="question-show-split"/>
  <div class="p-1">
    <div>
      <h4 class="question-show-title">{{$question->title}}</h4>
    </div>
    <div class="px-3">
      <span><a class="question-show-name" href="{{route('questions.index',['user_id'=>$question->user->id])}}">{{$question->user->name}}</a></span>
      <span class="px-2">|</span>
      <span>{{$question->created_at}}</span>
      <span class="px-2">|</span>
      <span>HIT : {{$question->view_count}}</span>
    </div>
    <hr class="question-show-split"/>
    <div class="py-3">
      <h4 class="text-justify question-show-content">{!!nl2br($question->content)!!}</h4>
    </div>
  </div>
  <hr class="question-show-split"/>
  <div class="d-flex justify-content-end pb-3">
    @can('board_update', $question)
      <span class="pr-2">
        <a class="btn btn-point" href="{{route('questions.edit',compact('question'))}}">수정하기</a>
      </span>
    @endcan
    @can('board_delete', $question)
      <span class="pr-2">
        <form method="POST" action="{{route('questions.destroy',compact('question'))}}">
          @method('DELETE')
          @csrf
          <button class="btn btn-point" type="submit">삭제하기</button>    
        </form>
      </span>
    @endcan
    <span>
      <a class="btn btn-point" href="{{route('questions.index')}}">뒤로가기</a>
    </span>
  </div>

  <div class="">
    @include('comments.index')
  </div>
</div>
@endsection