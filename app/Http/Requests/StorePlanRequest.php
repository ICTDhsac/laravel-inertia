<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlanRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'is_group_plan' => 'required|boolean',
            'department_ids' => 'required_if:is_group_plan,true|array',
            'department_ids.*' => 'exists:departments,id',
            'user_ids' => 'required_if:is_group_plan,false|array',
            'user_ids.*' => 'exists:users,id',
            'privacy' => 'required|in:public,private'
        ];
    }

    public function messages(): array
    {
        return [
            'department_ids.required_if' => 'The department is required when creating a group plan.',
            'department_ids.min' => 'Please select at least one department.',

            'user_ids.required_if' => 'Users are required when creating a personal plan.',
            'user_ids.min' => 'Please select at least one user.',

            'department_ids.*.exists' => 'One or more selected departments do not exist.',
            'user_ids.*.exists' => 'One or more selected users do not exist.',
        ];
    }
}
