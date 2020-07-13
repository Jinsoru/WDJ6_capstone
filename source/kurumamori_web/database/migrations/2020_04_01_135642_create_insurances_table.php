<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInsurancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('insurances', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('보험 번호');
            $table->unsignedBigInteger('user_id')->comment('유저 번호');
            $table->unsignedBigInteger('medical_id')->comment('의료정보 번호');
            // $table->string('insurance_name')->comment('보험사 명'); //보험사 명
            $table->unsignedBigInteger('insurance_list_id')->comment("보험사 리스트 번호");
            // $table->string('insurance_phone')->comment('보험사 폰 번호'); //보험사 폰 번호
            $table->date('subscription_date')->comment('보험 가입 날짜'); //보험 가입 날짜
            $table->date('expiration_date')->comment('보험 만기 날짜'); //보험 만기 날짜
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('생성 시간');
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('업데이트 시간');

            $table->foreign('user_id')->references('id')->on('users')->onUpdete('cascade')->onDelete('cascade');
            $table->foreign('insurance_list_id')->references('id')->on('insurance_lists')->onUpdete('cascade')->onDelete('cascade');
            $table->foreign('medical_id')->references('id')->on('medical_infos')->onUpdete('cascade')->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('insurances');
    }
}
