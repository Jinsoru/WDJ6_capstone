<div class="container mt-3">
    <form action="{{ route('comments.store',compact('review')) }}" method="POST">
        {!! csrf_field()!!}

        {!! \Log::info('comments form');!!}
        
        <div class="form-group {{$errors->has('content') ? 'has-error' : '' }}">
            <label class="" for="">본문</label>
            <textarea class="form-control" name="content" id="content" cols="30" rows="3"></textarea>
            {!! $errors->first('content','<span class="from-errors">:message</span>')!!}
        </div>
        <div class="form-group d-flex justify-content-end">
            <button class="btn btn-dark" type="submit">저장하기</button>
        </div>
    </form>
</div>