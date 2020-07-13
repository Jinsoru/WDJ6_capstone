<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'title' => ['max:40'],
            'content' => ['required','min:5'],
        ];
    }

    public function messages()
    {
        return [
            'required'=>':attribute은(는) 필수 입력 항목입니다.',
            'max'=>':attribute은(는) 최대 :max 글자 이상 입력할 수 없습니다.',
            'min'=>':attribute은(는) 최소 :min 글자 이상 입력이 필요합니다.',
            
        ];
    }

    public function attributes()
    {
        return [
            'title'=>'제목',
            'content'=>'본문',
            'category'=>'카테고리',
        ];
    }
}
