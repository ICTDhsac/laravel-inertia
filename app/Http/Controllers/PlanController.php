<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Http\Requests\StorePlanRequest;
use App\Http\Requests\UpdatePlanRequest;
use App\Models\Department;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlanController extends Controller
{

    protected $title = "Plans";
    protected $navigationLinks = [
        [
            'link' => '#',
            'icon' => 'House',
            'label' => 'Hub'
        ],
        [
            'link' => '#',
            'icon' => 'NotebookPen',
            'label' => 'Plans'
        ]
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::all();
        $navigationLinks = $this->navigationLinks;
        $navigationLinks[] = ['link' => '/plans/create', 'icon' => 'CalendarPlus', 'label' => 'Create'];
        return inertia('Planner/Plans/Index', compact('plans', 'navigationLinks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::all()->map(function ($department) {
            return ['value' => $department->id, 'label' => $department->name];
        });
        $users = User::all()->map(function ($user) {
            return ['value' => $user->id, 'label' => $user->full_name];
        });

        $navigationLinks = $this->navigationLinks;
        $navigationLinks[] = ['link' => '/plans/create', 'icon' => 'CalendarPlus', 'label' => 'Create'];

        return inertia('Planner/Plans/Create', compact('users', 'departments', 'navigationLinks'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlanRequest $request)
    {
        $users = [];
        $validatedData = $request->validated();
        dd($validatedData);
        DB::beginTransaction();
        try {
            if($validatedData['department_ids']){
                $users = User::with('department')->where('department_id', $validatedData['department_id'])->get();
            }

            $plan = Plan::create([
                'name' => $validatedData['name'],
                'privacy' => $validatedData['privacy'],
                'is_group_plan' => $validatedData['is_group_plan'],
                'created_by' => Auth::id()
            ]);
            dd($users);
            if($plan && $users){
                
                foreach($users as $user){
                    $plan->users()->attach($user['id'], ['is_division_user' => true] );
                }
                
            }
            DB::commit();
                
            return back()->with('response', [
                'error' => false,
                'message' => 'Plan created successfully!'
            ]);

        } catch(Exception $e) {
            DB::rollBack();
            return back()->with('response',[
                'error' => true,
                'message' => 'User creation failed' . $e->getMessage()
            ], 500)->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Plan $plan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlanRequest $request, Plan $plan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        //
    }

    public function getTitle(){
        return $this->title;
    }
}
