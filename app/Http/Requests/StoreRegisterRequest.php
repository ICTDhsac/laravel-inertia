<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRegisterRequest extends FormRequest
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
            'employee_id' => 'required|string|max:50|unique:user',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'middle_name' => 'nullable|min:3',
            'suffix' => 'nullable|string|max:20',
            'email' => 'required|string|email|max:255|unique:users',
            'contact' => ['nullable','regex:/^(\+639|09)[0-9]{9}$/'],
            'position_id' => 'required|exists:positions',
            'department_id' => 'required|exists:departments',
            'employment_status_id' => 'required|exists:employment_statuses',
            'schedule_id' => 'required|exists:schedules',
            'gender' => 'required',
            'date_hired' => ['required', 'date_format:Y-m-d'],
            'user_photo' => 'required|file|max:10240',
            'username' => 'required|string|max:255|unique:role_user',
            'role_id' => 'required|exists:roles',
            'password' => 'required|string|min:8|confirmed',
        ];
    }
}
