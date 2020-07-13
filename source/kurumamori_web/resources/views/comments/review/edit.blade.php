<div class="container mt-3 btn__edit__comment" style="display:{{ $style!=null ? $style : ''}};">
    <form action="{{ route('comments.update',compact('comment')) }}" method="POST">
        {!! csrf_field()!!}
        {!! \Log::info('comments form');!!}
        {!! method_field('PUT') !!}
        <div class="form-group {{$errors->has('content') ? 'has-error' : '' }}">
            <label class="" for="">본문</label>
            <textarea class="form-control" name="content" id="content" cols="30" rows="5">{{$comment->content}}</textarea>
            {!! $errors->first('content','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group d-flex justify-content-end">
            <button class="btn btn-dark" type="submit">저장하기</button>
            <button class="btn btn-dark review__comment__back">뒤로가기</button>
        </div>
    </form>
</div>