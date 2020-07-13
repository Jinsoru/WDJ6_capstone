<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SignUpController extends Controller
{
    public function __construct()
    {
        // $this->middleware('guest', ['except' => 'destroy']);

    }
    //로그인, 회원가입 페이지
    public function index()
    {
        return view('home.main');
    }

    //회원가입 요청
    public function create()
    {
        // return view('sessions.login');
    }

    //로그인 요청
    //\App\Http\Requests\UsersRequest $request
    public function store(Request $request)
    {
        $user = \App\User::create([
            'email' => $request->input('email'),
            'password' => \Hash::make($request->input('password')),
            'name' => $request->input('name'),
            'birth' => $request->input('birth'),
            'gender' => $request->input('gender'),
            'phone' => $request->input('phone'),
            'auth_token' => '',
            'confirm_code' => rand(1000,9999),  //컨펌코드
        ]);
        // //이메일
        event(new \App\Events\UserCreated($user));
            
        
        // flash('가입하신 메일 계정으로 가입 확인 코드를 보내드렸습니다. 
        //     확인하시고 로그인해주세요.');
        
        return $user;
    }
}
