@extends('layouts.app')

@section('content')

<section id="main-review">
    <div class="contaienr px-3 py-5 p-md-5">
        <div class="row m-3">
            <h1 class="">사용자 리뷰</h1>
        </div>
        <div class="row m-3">
            <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="row mb-3"> 
                    <form class="input-group col-xs-8 col-sm-8 col-md-4 mr-auto" method="get" action="{{route('reviews.index')}}" role="search">
                        <input type="text" class="form-control" placeholder="search.." aria-label="search.." aria-describedby="basic-addon2" id="search" name='search'>
                        <div class="input-group-append">
                            <button class="btn btn-outline-dark" type="submit">button</button>
                        </div>
                    </form>
                    <div class="col-auto">
                        <a class="btn btn-dark" href="{{route('reviews.create')}}">글 작성</a>
                    </div>
                </div>
                <table class="table table-hover .table-responsive">
                    <thead class="">
                        <tr>
                            <td>No</td>
                            <td></td>
                            <td>Category</td>
                            <td>Title</td>
                            <td>Writer</td>
                            <td>Date</td>
                            <td>HIT</td>
                        </tr>
                    </thead>
                    @forelse($reviews as $review)
                        <tbody class="">
                            <tr class="">
                                <td>{{ $review->id }}</td>
                                @if (\App\Comment::where('board_id','=',$review->id)->get()->count())
                                    <td>O</td>
                                @else
                                    <td>X</td>
                                @endif
                                <td>{{ \App\Category::find($review->category_id)->category }}</td>
                                <td><a href="{{route('reviews.show',compact('review'))}}">{{ $review->title }}</a></td>
                                <td>{{ $review->user->name }}</td>
                                <td>{{ $review->updated_at->format('y-m-d') }}</td>
                                <td>{{ $review->view_count }}</td>
                            </tr>
                        </tbody>
                    @empty
                    @endforelse
                </table>
                @if (! $reviews->count())
                    <div class="text-center">
                        <p class="text-dark">글 없음</p>
                    </div>
                @endif
                <div class=" col-xs-12 col-sm-12 col-md-12 d-flex justify-content-center">
                    @if($reviews ->count())
                        {!! $reviews->appends(Request::except('page'))->render() !!}
                    @endif
                </div>
            </div>
        </div>
    </div>
</section>
<!-- intro section -->
@endsection