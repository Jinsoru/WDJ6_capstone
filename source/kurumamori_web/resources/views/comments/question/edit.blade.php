<div class="container mt-3 question__comment__edit" style="display:{{ $style!=null ? $style : ''}};">
    <h1 class="">답변 작성</h1>
    <hr/>
    <form action="{{ route('comments.update',compact('comment')) }}" method="POST">
        {!! csrf_field()!!}
        {!! \Log::info('comments form');!!}
        {!! method_field('PUT') !!}
        <div class="form-group">
            <label class="" for="title {{$errors->has('title') ? 'has-error' : '' }}">제목</label>
            <input class="form-control" type="text" id="title" name="title" value="{{$comment->title}}"/>
            {!! $errors->first('title','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group {{$errors->has('content') ? 'has-error' : '' }}">
            <label class="" for="">본문</label>
            <textarea class="form-control" name="content" id="content" cols="30" rows="10">{{$comment->content}}</textarea>
            {!! $errors->first('content','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group d-flex justify-content-end">
            <button class="btn btn-dark" type="submit">저장하기</button>
            <button class="btn btn-dark question__comment__back">뒤로가기</button>
        </div>
    </form>
</div>