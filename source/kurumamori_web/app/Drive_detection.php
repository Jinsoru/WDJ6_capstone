<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drive_detection extends Model
{
    protected $fillable = [
        'drive_id',
        'user_id',
        'latitude', 
        'longitude', 
        'bool_report', 
        'bool_sudden_acceleration', 
        'bool_sudden_stop', 
        'bool_sleep'
    ];

    //여러 운전감지 정보는 한 유저를 가질 수 있음
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function drive()
    {
        return $this->belongsTo(Drive::class);
    }
}
