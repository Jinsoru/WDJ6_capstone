<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BuysRequest extends FormRequest
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
            'ea'  => ['min:1','integer','required'],
            'to_name' => ['required'],
            'to_phone'  => ['required'],
            'to_address'  => ['required'],
            'to_address'  => ['required'],
            'to_zipcode'  => ['required'],
            'payment'  => ['required'],
        ];
    }
    public function messages() {
        return [
            'integer' => '숫자만 입력할 수 있습니다.',
            'required' => '필수 입력입니다.',
            'min' => ':min 개 이상 구매해야 합니다.',
        ];
    }
}
