<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class BuyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index()
    {
        return view('product.buy');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    // \App\Http\Requests\Buy
    public function store(Request $request)
    {
        $total_price = $request->ea * 49900;

        $product_key =Str::random(4)."-".Str::random(4)."-".Str::random(4)."-".Str::random(4);
        \Log::info($request->all());
        $buy = \App\Product_buy::create([
            'user_id'=>$request->user_id,
            'ea'=>1,
            'price'=>$total_price,
            'to_name'=>$request->name,
            'to_phone'=>$request->phone,
            'to_address'=>$request->address,
            'to_zipcode'=>$request->postal,
            // 'to_msg'=>$request->to_msg,
            'payment'=>'s',
            'product_key'=>$product_key,
        ]);

        // return redirect('/thanks');
        return response()->json([
            'buy'=>$buy,
            'status'=>true
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        \Log::info("gg");
        return view("home.main");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
