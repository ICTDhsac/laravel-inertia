<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $title = 'Users';

    /*echo "<pre>";
    dd($users);
    $role = Role::with('users')->find(1);
    $user = User::with('roles')->find(1);
    $user1 = User::find(1);
    $user1->roles()->attach(4);

    dd(($user1->roles->find(2))->toArray());
    
    foreach($users1 as $user){
        echo $user->first_name . "<br>";
    }
    dd($users);
    dd($users1);

    $users = User::with('posts')->get();
    $users = User::with(['posts' => function($query) {
    $query->select('id', 'user_id', 'title'); // Specify only the columns you want
    }])->get();

    */

    public function index()
    {
        // $update = User::query()->update(['created_by' => '347']);
        $users = User::with([
                        'position:id,name',
                        'employmentStatus:id,name',
                        'schedule:id,name',
                        'department:id,name,office_id',
                        'department.office:id,name,location_id',
                        'department.office.location:id,name',
                        'schedule:id,name',
                        'creator:id,first_name,last_name'
                    ])
                    ->select('*')
                    ->selectRaw("last_name || ', ' || first_name || ' ' || COALESCE(middle_name, '') AS fullname")
                    ->get();

        $departments = Department::query()->select('id', 'name')->get();

        return response()->json($users);
        // return inertia('HRMIS/Users/Index', compact('users', 'departments'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /* getter for the page title */
    public function getTitle()
    {
        return $this->title;
    }

    public function upload_user_photo(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,pdf|max:2048',
        ]);

        $path = $request->file('file')->store('uploads/user_photo', 'public');

        return response()->json(['path' => $path], 201);
    }
}
