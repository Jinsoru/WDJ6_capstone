<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Insurance_list extends Model
{
    protected $fillable = [
        
        'insurance_name',
        'insurance_phone'
    ];

    //보험사는 여러 보험을 가질 수 있음
    public function insurances(){
        return $this->hasMany(Insurance::class);
    }
}
