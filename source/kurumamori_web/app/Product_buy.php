<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product_buy extends Model
{
    protected $fillable = [
        'user_id',
        'ea',
        'price',
        'to_name',
        'to_phone',
        'to_address',
        'to_msg',
        'to_zipcode',
        'payment',
        'product_key',
        'product_name'
    ];

    public function user(){
        //일대다 관계에서 one쪽은 단수
        return $this->belongsTo(User::class);
    }
}
