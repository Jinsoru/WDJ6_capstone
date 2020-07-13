<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sickness extends Model
{
    protected $fillable = [
        'user_id',
        'medical_id',
        'sickness_name',
        'medicine',
        'symptom',
        'hospital'
    ];

    //여러 기저 질환은 한 의료정보를 가질 수 있음
    public function medical_info()
    {
        return $this->belongsTo(Medical_info::class);
    }
}
