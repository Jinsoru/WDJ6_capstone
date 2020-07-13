@extends('layouts.app')
@section('content')
<style>
</style>
<div class="container mt-5 pt-5">
    <header>
      <span><a href="{{route('reviews.index')}}">home</a></span>
    </header>
    <hr/>
    <div class="p-1">
      <div>
        <h4>{{$review->title}}</h4>
      </div>
      <div>
        <span><a href="{{route('reviews.index',['user_id'=>$review->user->id])}}">{{$review->user->name}}</a></span>
        <span>|</span>
        <span>{{$review->created_at}}</span>
        <span>|</span>
        <span>HIT : {{$review->view_count}}</span>
      </div>
      <hr />
      <div>
          <h4 class="text-justify ">{!!nl2br($review->content)!!}</h4>
      </div>
    </div>
    <hr/>
    <div class="d-flex justify-content-end pb-3">
      @can('board_update', $review)
        <span class="pr-2">
          <a class="btn btn-dark" href="{{route('reviews.edit',compact('review'))}}">수정하기</a>
        </span>
      @endcan
      @can('board_delete', $review)
        <span class="pr-2">
          <form method="POST" action="{{route('reviews.destroy',compact('review'))}}">
            @method('DELETE')
            @csrf
            <button class="btn btn-dark" type="submit">삭제하기</button>    
          </form>
        </span>
      @endcan
      <span>
        <a class="btn btn-dark" href="{{route('reviews.index')}}">뒤로가기</a>
      </span>
    </div>
  
    <div class="">
      @include('comments.index')
    </div>
</div>

@endsection