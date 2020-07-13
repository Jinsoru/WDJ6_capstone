<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }


    public function index()
    {
        return view('home.main');
    }

    public function create(Request $request)
    {

    }
    public function show(Request $request)
    {
        return view('home.main');
    }
    //제품 등록
    public function store(Request $request, \App\User $user)
    {
         // \Log::info($request->product_key);
         $product = \App\Product_buy::whereProduct_key($request->product_key)->first();
         if (!$product) {
             // flash()->error("잘못된 키입니다. 다시 입력해주세요");
             return response()->json([], 204);
 
         }
 
         $product_use = \App\Product::whereProduct_key($product->product_key)->first();
         // \Log::info($product_use);
         if ($product_use) {
             // flash()->error("이미 사용한 키입니다.");
             return response()->json([], 204);
         }
         $product_buy_id = \App\Product_buy::whereProduct_key($request->product_key)->first()->id;
         $create_product = \App\Product::create([
             'user_id' => $request->user_id,
             'product_buy_id' => $product_buy_id,
             'product_key' => $request->product_key,
             'date_buy' => $product->created_at,
             'date_as' => date("Y-m-d", strtotime("{$product->created_at} +1 years")),
         ]);
         return response()->json([$create_product], 200);

    }

    //제품 수정
    public function update(Request $request,  \App\Product $product)
    {
        \Log::info($request->all());
        $product_buy = \App\Product_buy::whereProduct_key($request->product_key)->first();

         if (!$product_buy) {
             // flash()->error("잘못된 키입니다. 다시 입력해주세요");
             return response()->json([], 204);
 
         }
         $product_use = \App\Product::whereProduct_key($product_buy->product_key)->first();
         // \Log::info($product_use);
         if ($product_use) {
             // flash()->error("이미 사용한 키입니다.");
             return response()->json([], 204);
         }
         \Log::info($product);
         $product->update([
            // \App\Product::create([
             'user_id' => $request->user_id,
             'product_name' => $product_buy->product_name,
             'product_key' => $request->product_key,
             'date_buy' => $product_buy->created_at,
             'date_as' => date("Y-m-d", strtotime("{$product_buy->created_at} +1 years")),
         ]);
         \Log::info("!!");
         return response()->json([], 200);

    }
    public function destroy(\App\Product $product)
    {
        \Log::info($product);
        \App\Product::whereUserId($product->user_id)->delete();
        // $this->authorize('delete', $product);
        
        // $product->delete();
        return response()->json([], 200);

    }
    

    // protected function respondError($message)
    // {
    // }

    // protected function respondCreated($message)
    // {
    // }
}
