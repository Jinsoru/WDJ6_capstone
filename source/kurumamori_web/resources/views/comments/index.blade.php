<div>
    @if ($category != 7)
        @if ($comments->count() == 0)
            @can('master', $comments)
                @include('comments.question.create')                
            @endcan
        @else
            @forelse($comments as $comment)
                @include('comments.question.comment')
                @include('comments.question.edit',['style' => "none"])   
            @empty
            @endforelse
        @endif
    @else
        @include('comments.review.create')
        @forelse($comments as $comment)
            @include('comments.review.comment')
            @include('comments.review.edit',['style' => "none"])   
        @empty
        @endforelse
    @endif
</div>

<script>
    $('.btn__edit__comment').on('click', function(e) {
        $('.question-comment').css('display','none');
        $('.question__comment__edit').css('display','block');
    });
    $('.question__comment__back').on('click', function(e) {
        $('.question-comment').css('display','block');
        $('.question__comment__edit').css('display','none');
    });
    $('.review__edit__comment').on('click', function(e) {
        $('.review__comment').css('display','none');
        $('.question__comment__edit').css('display','block');
    });
    $('.review__comment__back').on('click', function(e) {
        $('.question__comment').css('display','block');
        $('.question__comment__edit').css('display','none');
    });
</script>