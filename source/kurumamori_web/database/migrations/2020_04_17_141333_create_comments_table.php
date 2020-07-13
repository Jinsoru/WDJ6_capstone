<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->bigIncrements('id')->comment('댓글 번호');
            $table->unsignedBigInteger('user_id')->comment('유저 번호');
            $table->unsignedBigInteger('board_id')->comment('게시판 번호');
            $table->unsignedBigInteger('parent_id')->nullable()->comment('부모 번호');
            $table->boolean('multiple_type')->comment('복수 타입');
            $table->String('title')->default('Untitled')->comment('제목');
            $table->text('content')->comment('내용');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('생성 시간');
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->comment('업데이트 시간');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('board_id')->references('id')->on('boards')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('comments');

        });
    }
    public function down()
    {
        Schema::table('comments', function(Blueprint $table){
            $table->dropForeign('comments_user_id_foreign');
            $table->dropForeign('comments_board_id_foreign');
            $table->dropForeign('comments_parent_id_foreign');
        });
        Schema::dropIfExists('comments');
    }
}
