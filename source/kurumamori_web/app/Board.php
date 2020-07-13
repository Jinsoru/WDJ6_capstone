<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    protected $fillable = ['user_id','title', 'content','category_id'];

    //여러질문은 한 유저를 가질 수 있음
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    //하나의 질문은 하나의 카테고리를 가질 수 있음
    public function category()
    {
        return $this->hasOne(Category::class);
    }
}
