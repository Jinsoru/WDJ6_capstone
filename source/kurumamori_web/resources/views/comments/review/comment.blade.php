<div class="card review__comment">
    <header>
        <h5>{{\App\User::find($comment->user_id)->name}}</h5>
    </header>
    <div>
        {!!nl2br($comment->content)!!}
    </div>
    <div>
        <span>{{$comment->created_at}}</span>
    </div>
    <div class="d-flex justify-content-end">
        @can('comment_update', $comment)
            <button class="btn btn-dark review__edit__comment">수정하기</button>
        @endcan
        @can('comment_delete', $comment)
            <form method="POST" action="{{route('comments.destroy',compact('comment'))}}">
                @method('DELETE')
                @csrf
                <button class="btn btn-dark" type="submit">삭제하기</button>    
            </form>
        @endcan
    </div>
</div>