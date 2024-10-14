<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRegisterRequest;
use App\Models\Department;
use App\Models\EmploymentStatus;
use App\Models\Position;
use App\Models\Role;
use App\Models\RoleUser;
use App\Models\Schedule;
use App\Models\User;
use Exception;
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
        $validatedData = $request->validated();
        // dd($validatedData);
        if ($request->hasFile('user_photo')) {
            $file = $request->file('user_photo');
            $fileName = $validatedData['employee_id'] . '_' . time() . '_' . $file->getClientOriginalName();
            $userPhotoPath = $file->storeAs('uploads/user_photo', $fileName, 'public');
            $validatedData['user_photo'] = $userPhotoPath;
        }
        $userData = array_intersect_key($validatedData, array_flip((new User)->getFillable()));
        $roleData = array_intersect_key($validatedData, array_flip((new RoleUser)->getFillable()));

        DB::beginTransaction();
        try {
            $user = User::create($userData);
            $user->roles()->attach($roleData['role_id'], $roleData);
            DB::commit();

            Auth::login($user);

            return redirect()->back()->with('response', [
                'error' => false,
                'message' => 'User created successfully!'
            ]);

        } catch(Exception $e) {
            DB::rollBack();
            return to_route('register.show')->with('response',[
                'error' => true,
                'message' => 'User creation failed' . $e->getMessage()
            ], 500)->withInput();
        }

    }
}
