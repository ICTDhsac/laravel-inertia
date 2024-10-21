<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePlanRequest extends FormRequest
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

        $planId = $this->route('plan'); // Get the current plan's ID from the route

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                // Allow same name for the current plan, but ensure it's unique for others
                Rule::unique('plans', 'name')->ignore($planId),
            ],
            'is_group_plan' => 'required|boolean',
            'departments' => 'required_if:is_group_plan,true|array',
            'departments.*' => 'exists:departments,id',
            'users' => 'required_if:is_group_plan,false|array',
            'users.*' => 'exists:users,id',
            'privacy' => 'required|in:public,private'
        ];
    }

    public function messages(): array
    {
        return [
            'departments.required_if' => 'The department is required when creating a group plan.',
            'departments.min' => 'Please select at least one department.',

            'users.required_if' => 'Users are required when creating a personal plan.',
            'users.min' => 'Please select at least one user.',

            'departments.*.exists' => 'One or more selected departments do not exist.',
            'users.*.exists' => 'One or more selected users do not exist.',

            'name.unique' => 'The plan name must be unique, except for the current plan.',
        ];
    }
}
