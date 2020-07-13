<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
class InfoController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }
    public function index(Request $request)
    {  
        \Log::info(\Auth::user());
        return view('home.main');
        // return \Auth::user();
    }

    public function show(Request $request, $user_id){
        \Log::info(\Auth::user());
        // \Log::info($user_id);
        $user = \App\User::whereId($user_id)->first();
        //신고 이력
        $reports = \App\Drive_detection::
            whereUser_id($user_id)->
            whereBool_report(true)->
            orderBy('created_at','desc')->
            paginate(3);
        //게시판 최근 5개
        $boards = \App\Board::whereUser_id($user_id)->orderBy('id', 'desc')->paginate(5);
        //게시판 카테고리
        $board_categories = array();
        for($i = 0; $i < count($boards); $i++){
            array_push($board_categories, \App\Category::whereId($boards[$i]->category_id)->first());
        }
        //게시판 대답여부
        $board_comment = array();
        for($i = 0; $i < count($boards); $i++){
            array_push($board_comment, \App\Comment::whereBoardId($boards[$i]->id)->first());
        }
        // \Log::info($board_comment);
        $product = \App\Product::whereUser_id($user_id)->first();
        $product_buy = $product ? \App\Product_buy::whereProduct_key($product->product_key)->first() : null;
        //사용자가 구매한 키
        $user_product_buy_key = \App\Product_buy::whereUser_id($user_id)->get();
        // \Log::info($board_categories[0][0]->id);
        // return view('home.main', compact('user', 'reports', 'product', 'boards', 'board_categories', 'board_comment','product_buy', 'user_product_buy_key'));
        return response()->json([
            'user' => $user,
            'reports' => $reports,
            'product' => $product,
            'boards' => $boards, 
            'board_categories' => $board_categories, 
            'board_comments' => $board_comment, 
            'product_buy' => $product_buy, 
            'user_product_buy_key' => $user_product_buy_key, 
        ]);
    }
}
