<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $title = 'Users';
    /**
     * Display a listing of the resource.
     */
    // echo "<pre>";
        // dd($users);
        // $role = Role::with('users')->find(1);
        // $user = User::with('roles')->find(1);
        // $user1 = User::find(1);
        // $user1->roles()->attach(4);

        // dd(($user1->roles->find(2))->toArray());
        
        // foreach($users1 as $user){
        //     echo $user->first_name . "<br>";
        // }
        // dd($users);
        // dd($users1);

        // $users = User::with('posts')->get();
        // $users = User::with(['posts' => function($query) {
        //     $query->select('id', 'user_id', 'title'); // Specify only the columns you want
        // }])->get();

    public function index()
    {
    
        $users = User::with([
                        'position:id,name',
                        'employmentStatus:id,name',
                        'schedule:id,name',
                        'department:id,name',
                        'department.office:id,name',  // Include the office related to the department
                    ])
                    ->select('*')
                    ->selectRaw("last_name || ', ' || first_name || ' ' || COALESCE(middle_name, '') AS fullname")
                    ->get();
                    dd($users[0]->toArray());
        return inertia('HRMIS/Users/Index', ['users' => $users]);
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

    public function getTitle()
    {
        return $this->title;
    }
}
