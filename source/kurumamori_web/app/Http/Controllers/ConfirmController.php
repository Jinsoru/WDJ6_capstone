<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use JWTAuth;
use JWTAuthException;

class ConfirmController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('guest', ['except' => 'destroy']);
    // }

    public function index()
    {
        return view('home.main');
        // return view('users.confirm');
    }

    public function create()
    {
        // return view('sessions.login');
    }

    public function store(Request $request)
    {
        // \Log::info($request->all());
        $user = \App\User::whereConfirmCode($request->confirm_code)->first();

        if (!$user) {
            // flash('입력하신 코드가 올바르지 않습니다. 다시 입력해 주세요.');
            $response = ['success'=>false];        

        }
        else{
            try {
                //이메일과 비밀번호가 맞지 않으면
                if(!$token = JWTAuth::attempt(['email' => $request->email, 'password' => $request->password])){
                    return response()->json([
                        'success' => false,
                        'error' => 'invalid_credentials'
                    ], 400);
                }
            //토큰 생성이 안되면
            }catch(JWTException $e){
                return response()-json([
                    'success' => false,
                    'error' => 'could_not_create_token'
                ], 500);
            }
            \Log::info(\Auth::user());
            $user->update([
                'confirm_code' => null
            ]);
            return response()->json(compact('token'));
            // return response()->json([
            //     'access_token' => $token,
            //     'token_type' => 'bearer',
            //     'expires_in' => \Auth::guard('api')->factory()->getTTL() * 60
            // ]);
        }
    }

    //토큰 생성
    // private function getToken($email, $password){
    //     $token = null;
        
    //     try {
    //         if (!$token = JWTAuth::attempt(['email'=>$email, 'password'=>$password])) {
    //             return response()->json([
    //                 'response' => 'error',
    //                 'message' => 'Password or email is invalid',
    //                 'token'=>$token
    //             ]);
    //         }
    //     } catch (JWTAuthException $e) {
    //         return response()->json([
    //             'response' => 'error',
    //             'message' => 'Token creation failed',
    //         ]);
    //     }
    //     return $token;
    // }
}

