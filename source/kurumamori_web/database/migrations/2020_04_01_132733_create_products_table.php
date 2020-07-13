<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('제품 번호');
            $table->unsignedBigInteger('user_id')->comment('유저 번호');
            $table->unsignedBigInteger('product_buy_id')->comment('제품 구매 번호');
            // $table->string('product_name')->comment('제품 명');
            $table->string('product_key')->unique()->comment('제품 키');
            // $table->date('date_buy')->comment('구입날짜');
            // $table->date('date_as')->comment('as기한');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('생성 시간');
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('업데이트 시간');

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('product_buy_id')->references('id')->on('product_buys')->onUpdate('cascade')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
