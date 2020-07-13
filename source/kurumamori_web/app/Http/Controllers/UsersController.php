<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;




class UsersController extends Controller
{
    //뷰
    public function index()
    {
        return view('home.main');
    }

    //회원가입
    public function register(Request $request){
        
        //이메일이 있으면
        if(\App\User::whereEmail($request->email)->first()){
            return response()->json(['error' => 'users_email_unique']);
        }
        //휴대폰 번호가 있으면
        if(\App\User::wherePhone($request->phone)->first()){
            return response()->json(['error' => 'users_phone_unique']);
        }

        $user = \App\User::create([
            'email' => $request->input('email'),
            'password' => \Hash::make($request->input('password')),
            'name' => $request->input('name'),
            'birth' => $request->input('birth'),
            'gender' => $request->input('gender'),
            'phone' => $request->input('phone'),
            'confirm_code' => rand(1000,9999),  //컨펌코드
        ]);

        $token = JWTAuth::fromUser($user);

        // return response()->json([
        //     'success' => true,
        //     'data' => $user
        // ], 201);
        
        return response()->json(compact('user','token'),201);

    }

    //로그인
    public function login(Request $request){
        //이메일과 비밀번호를 받음
        $credentials = $request->json()->all();        
        try {
            //잘못된 로그인 요청
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials']);
            }
        //토큰 생성 실패
        } catch (\JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json( compact('token') );

    }

    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        // Tymon\JWTAuth\Exceptions\TokenExpiredException
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            \Log::info("토큰 오류");
            // return response()->json(['token_expired'], $e->getStatusCode());
            return response()->json([
                'success' => false
            ]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }

}
