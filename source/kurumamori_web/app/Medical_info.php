<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medical_info extends Model
{
    protected $fillable = [
        'user_id',
        // 'past_sickness', 
        // 'past_sickness_supplementation',
        // 'sickness', 
        // 'medicine', 
        // 'symptom', 
        'guardian_phone',
        'blood_type',
        'disability_status', 
        'hospital', 
        // 'hospital_menu', 
        'report_request'
    ];

    //일대일
    public function user()
    {
        return $this->hasOne(User::class);
    }
    //일대다
    public function past_sicknesses()
    {
        return $this->hasMany(Past_sicknesses::class);
    }
    public function sicknesses()
    {
        return $this->hasMany(Sicknesses::class);
    }
}
