<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommentsController extends Controller
{
  
    public function store(\App\Http\Requests\CommentsRequest $request)
    {
        \Log::info('comments store');
        \Log::info($request->all());
        if($request->question){
            $board = $request->question;
        }
        else{
            $board = $request->review;
        }
        if(\App\Category::find( \App\Board::find($board)->category_id )->id == 7){
            \Log::info(1);

            $comment = \App\User::find(1)->comments()->create([
                'board_id'=>$request->review,
                'multiple_type'=> true,
                'content'=>$request->content,
            ]);
        }
        else{
            \Log::info(2);
            $comment = \App\User::find(1)->comments()->create([
                'board_id'=>$request->question,
                'multiple_type'=> false,
                'title'=>$request->title,
                'content'=>$request->content,
            ]);
        }
        if(! $comment){

            flash()->error(
                trans('question 저장 실패')
            );

            return back()->withInput();
        }
        
        return back()->withInput();
    }

    public function update(\App\Http\Requests\CommentsRequest $request,\App\Comment $comment)
    {
        \Log::info('comments update');
        \Log::info($request->all());
        
        $comment->update($request->all());

        if(! $comment){

            flash()->error(
                trans('comment 업데이트 실패')
            );

            return back()->withInput();
        }

        return back()->withInput();
    }
    public function destroy(\App\Comment $comment)
    {
        \Log::info('comments destroy');
        $comment->delete();

        return back()->withInput();
    }
}
