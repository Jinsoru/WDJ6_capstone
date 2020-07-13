<style>
    .question-comment{
        border: 1px solid black;
        border-radius: 5px 5px 5px 5px;
    }
</style>
<div class="mt-5">
    <div class="p-4 question-comment">
        <div>
            <h3>{{$comment->title}}</h3>
        </div>
        <hr/>
        <div class=" px-3">
            <h4>{!!nl2br($comment->content)!!}</h4>
        </div>
        <hr/>
        <div class="d-flex justify-content-end">
            @can('master', $comment)
                <span class="pr-2">
                    <button class="btn btn-point btn__edit__comment">수정하기</button>
                </span>
                <form method="POST" action="{{route('comments.destroy',compact('comment'))}}">
                    @method('DELETE')
                    @csrf
                    <button class="btn btn-point" type="submit">삭제하기</button>    
                </form>
            @endcan
        </div>
    </div>
</div>