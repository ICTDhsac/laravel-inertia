<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegisterRequest;
use App\Models\Department;
use App\Models\EmploymentStatus;
use App\Models\Position;
use App\Models\Role;
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
        $positions = Position::all()->map(function ($position) {
            return ['value' => $position->id, 'label' => $position->name];
        });
    
        $departments = Department::all()->map(function ($department) {
            return ['value' => $department->id, 'label' => $department->name];
        });
    
        $employment_status = EmploymentStatus::all()->map(function ($status) {
            return ['value' => $status->id, 'label' => $status->name];
        });
    
        $schedules = Schedule::all()->map(function ($schedule) {
            return ['value' => $schedule->id, 'label' => $schedule->time_in . ' - ' . $schedule->time_out];
        });
    
        $roles = Role::all()->map(function ($role) {
            return ['value' => $role->id, 'label' => $role->name];
        });
    
        return Inertia::render('Auth/Register', compact('positions', 'departments', 'employment_status', 'schedules', 'roles'));
    }
    
    public function register(StoreRegisterRequest $request)
    {
        // the StoreRegisterRequest allreay validated the form data
        
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
