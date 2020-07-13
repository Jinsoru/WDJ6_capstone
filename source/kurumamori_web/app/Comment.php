<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['title','content','board_id','multiple_type'];

    //여러 댓글은 한 유저를 가짐
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //여러 댓글은 한 게시판을 가짐
    public function boards()
    {
        return $this->belongsTo(Board::class);
    }

}
