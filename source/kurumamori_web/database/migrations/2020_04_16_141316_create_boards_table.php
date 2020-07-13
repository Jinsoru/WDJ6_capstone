<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoardsTable extends Migration
{
    public function up()
    {
        Schema::create('boards', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('게시판 번호');
            $table->unsignedBigInteger('user_id')->comment('유저 번호');
            $table->unsignedBigInteger('category_id')->comment('카테고리 번호');
            $table->string('title')->comment('게시판 제목');
            $table->text('content')->comment('게시판 내용');
            $table->bigInteger('view_count')->comment('조회수')->default(0);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('생성 시간');
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('업데이트 시간');

            $table->foreign('user_id')->references('id')->on('users')->onUpdete('cascade')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('boards', function(Blueprint $table){
            $table->dropForeign('boards_user_id_foreign');
        });
        
        Schema::dropIfExists('boards');
    }
}
