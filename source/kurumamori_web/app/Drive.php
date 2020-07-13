<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drive extends Model
{
    protected $fillable = ['user_id', 'drive_score', 'sleep_count', 'sudden_stop_count', 'sudden_acceleration_count'];

    //여러 운전정보는 한 유저를 가질 수 있음
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //한 운전정보는 여러 위험정보를 가질 수 있음
    public function drive_detections(){
        return $this->hasMany(Drive_detection::class);
    }

}
