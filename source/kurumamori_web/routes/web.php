<?php

use Illuminate\Support\Facades\Route;
Auth::routes();
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::resource('/app', 'AppController');

Route::get('/', function () {
    return view('home.main');
});

Route::get('logout',function(){
    Auth::logout();
    return view('home.main');
});

// 로그인 컨트롤러
Route::get('/auth/login', 'UsersController@index');
// 회원가입 컨트롤러
Route::get('/auth/register', 'UsersController@index');

//메일관련 컨트롤러
Route::resource('/confirm', 'ConfirmController');


//내정보
Route::resource('/info/index', 'InfoController');
Route::resource('/info/medical_info', 'MedicalController');
Route::put('/info/medical_infos/{medical_id}', 'MedicalController@update');
Route::resource('/info/drive_score', 'DriveController');

//운전점수 날짜별 검색
Route::get('/info/{date}/drive_score', [ //{date}값에 들어온 것은 index메서드로 넘김
    'as' => 'date.drive',
    'uses' => 'DriveController@index',
]);

//정인식 제품 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
Route::resource('/products','ProductController');

Route::resource('/buy','BuyController');
Route::get('/thanks', function () {
    return view('product.thanks');
});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ Q&A ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
Route::resource('/boards/questions','QuestionsController');
Route::get('/get/boards/questions','QuestionsController@data');
Route::post('/onShow/boards/questions/', [ 
    'uses' => 'QuestionsController@onShow',
]);

Route::resource('/boards/questions/comments','CommentsController');

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 유저리뷰 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
Route::resource('/boards/reviews','ReviewsController');


//ㅡㅡㅡㅡㅡㅡㅡㅡ 빅데이터 페이지 ㅡㅡㅡㅡㅡㅡㅡㅡ
Route::resource('/bigdata', 'BigdataController');
//빅데이터 페이지 값 받기
Route::get('/api/bigdata', ['uses' => 'BigdataController@data']);
// Route::get('/bigdata', ['uses' => 'BigdataController@index']);


Route::resource('/app', 'AppController');
Route::resource('/smstest', 'TestController');
