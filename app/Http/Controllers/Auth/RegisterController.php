<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\EmploymentStatus;
use App\Models\Position;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class RegisterController extends Controller
{

    public function showRegisterForm()
    {

        // dd(Schedule::all()->toArray());
        $positions = array_map(function($array){
            return ['value' => $array['id'], 'label' => $array['name']];
        }, Position::all()->toArray());

        $departments = array_map(function($array){
            return ['value' => $array['id'], 'label' => $array['name']];
        }, Department::all()->toArray());

        $employment_status = array_map(function($array){
            return ['value' => $array['id'], 'label' => $array['name']];
        }, EmploymentStatus::all()->toArray());
        
        $schedules = array_map(function($array){
            return ['value' => $array['id'], 'label' => $array['time_in'] . ' - ' . $array['time_out']];
        }, Schedule::all()->toArray());

        return Inertia::render('Auth/Register', compact('positions', 'departments', 'employment_status', 'schedules'));
    }
    public function register(Request $request)
    {
        // Validate the input data
        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|string|max:50|unique:user',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'username' => 'required|string|max:255|unique:role_user',
            'password' => 'required|string|min:8|confirmed',
            'email' => 'required|string|email|max:255|unique:users',
            'gender' => 'required',
            'user_photo' => 'required|file|max:10240',
            'contact' => ['required', 'regex:/^(\+639|09)[0-9]{9}$/'],
            'date_hired' => ['required', 'date_format:Y-m-d']
            
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Create a new user in the users table
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            // Set other fields as needed
            'password' => Hash::make($request->password), // Store the hashed password
        ]);

        // Create a corresponding entry in the role_user table
        DB::table('role_user')->insert([
            'user_id' => $user->id,
            'username' => $request->username,
            'password' => Hash::make($request->password), // Store the hashed password
            // Assign a default role_id if necessary
            'role_id' => 1, // Adjust this as needed
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Optionally log the user in after registration
        Auth::login($user);

        // Redirect to the intended page or dashboard
        return redirect()->intended('/login');
    }
}
