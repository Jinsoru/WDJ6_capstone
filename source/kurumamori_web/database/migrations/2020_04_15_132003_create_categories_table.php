<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('카테고리 번호');
            $table->string('category')->comment('카테고리명');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('생성 시간');
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('업데이트 시간');

        });
    }
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
