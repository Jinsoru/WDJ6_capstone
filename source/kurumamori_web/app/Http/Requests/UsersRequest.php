<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UsersRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
            'name' => 'required',
            'birth' => 'required',
            'gender' => 'required',
            'phone' => 'required|min:11|unique:users',
        ];
    }
    public function messages() {
        return [
            'email.required' => '이메일을 입력해주세요',
            'email.unique' => '이미 가입된 이메일입니다.',
            'password.required' => '비밀번호를 입력해주세요',
            // 'password.confirmed' => '비밀번호 확인이 맞지 않습니다.',
            'min.required' => '비밀번호는 최소 :min글자를 적어주세요',
            'name.required' => '이름을 입력해주세요',
            'birth.required' => '나이를 입력해주세요',
            // 'birth.integer' => '숫자를 입력하세요',
            'gender.required' => '성별을 체크해주세요',
            'phone.required' => '휴대폰 번호를 입력해주세요',
            'phone.min' => '최소 :min글자 이상 적어주세요',
            'phone.unique' => '이미 가입된 번호입니다.',
        ];
    }
}
