<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
            'card_image'  => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'old_price'   => 'nullable|integer|min:0|gt:new_price',
            'new_price'   => 'required|integer|min:0',
        ];
    }
}
