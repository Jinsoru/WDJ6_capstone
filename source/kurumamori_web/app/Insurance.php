<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Insurance extends Model
{
    protected $fillable = [
        'user_id', 
        'insurance_list_id',
        'medical_id',
        // 'insurance_phone', 
        'subscription_date', 
        'expiration_date'];

    //여러 보험은 한 유저를 가질 수 있음
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //여러 보험은 한 보험사를 가질 수 있음
    public function insurance_list()
    {
        return $this->belongsTo(Insurance_list::class);
    }
}
