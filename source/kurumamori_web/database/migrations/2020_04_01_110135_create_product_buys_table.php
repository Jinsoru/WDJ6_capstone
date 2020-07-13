<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductBuysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_buys', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('구매 번호');
            $table->unsignedBigInteger('user_id')->comment('유저 번호');
            $table->bigInteger('ea')->comment('제품 수량');
            $table->bigInteger('price')->comment('제품 가격');
            $table->string('to_name')->comment('받는사람 명');
            $table->string('to_phone')->comment('받는 사람 폰 번호'); 
            $table->string('to_address')->comment('받는 사람 주소'); 
            $table->string('to_zipcode')->comment('받는 사람 우편번호');
            $table->string('to_msg')->nullable()->comment('보내는 메시지');
            $table->string('payment')->comment('결제 수단'); 
            // $table->string('product_name')->comment('제품 명'); 
            $table->string('product_key')->unique()->comment('제품 키'); 
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('구입 날짜');
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('업데이트 시간');

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');

            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_buys');
    }
}
