<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Past_sickness extends Model
{
    protected $fillable = [
        'user_id',
        'medical_id',
        'past_sickness_name',
        'past_sickness_supplementation'
    ];

    //여러 과거병력은 한 의료정보를 가질 수 있음
    public function medical_info()
    {
        return $this->belongsTo(Medical_info::class);
    }
}
