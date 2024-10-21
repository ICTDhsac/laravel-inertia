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
use Inertia\Inertia;

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
        return inertia('Planner/Plans/Index', compact('plans', 'navigationLinks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $plans = Plan::latest()->get();
        // dd($plans);
        $departments = Department::all()->map(function ($department) {
            return ['value' => $department->id, 'label' => $department->name];
        });
        $users = User::all()->map(function ($user) {
            return ['value' => $user->id, 'label' => $user->full_name];
        });

        $navigationLinks = $this->navigationLinks;
        $navigationLinks[] = ['link' => '/plans/create', 'icon' => 'CalendarPlus', 'label' => 'Create'];

        return inertia('Planner/Plans/Create', compact('users', 'departments', 'navigationLinks', 'plans'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlanRequest $request)
    {
        $formData = $request->validated();
        
        DB::beginTransaction();
        try {
            // $users = User::with('department')->where('department_id', $formData['department_id'])->get();
            
            $plan = Plan::create([
                'name' => $formData['name'],
                'privacy' => $formData['privacy'],
                'is_group_plan' => $formData['is_group_plan'],
                'created_by' => Auth::id()
            ]);

            if($formData['is_group_plan']){
                $plan->departments()->sync($formData['department_ids']);
                
            }else{
                $plan->users()->sync($formData['user_ids']);    
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
        $plan->load('users', 'departments');
        
        /* Select options */
        $departmentOptions = Department::all()->map(function ($department) {
            return ['value' => $department->id, 'label' => $department->name];
        });
        $userOptions = User::all()->map(function ($user) {
            return ['value' => $user->id, 'label' => $user->full_name];
        });

        $navigationLinks = $this->navigationLinks;
        $navigationLinks[] = ['link' => "/plans/{$plan->id}", 'icon' => 'View', 'label' => 'View'];
        return inertia('Planner/Plans/Show', compact('plan', 'navigationLinks', 'departmentOptions', 'userOptions'))->with('referrer', url()->previous());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        $plan->load('users', 'departments');
        
        /* Select options */
        $departmentOptions = Department::all()->map(function ($department) {
            return ['value' => $department->id, 'label' => $department->name];
        });
        $userOptions = User::all()->map(function ($user) {
            return ['value' => $user->id, 'label' => $user->full_name];
        });

        $navigationLinks = $this->navigationLinks;
        $navigationLinks[] = ['link' => "/plans/{$plan->id}", 'icon' => 'View', 'label' => 'View'];
        return inertia('Planner/Plans/Edit', compact('plan', 'navigationLinks', 'departmentOptions', 'userOptions'))->with('referrer', url()->previous());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlanRequest $request, Plan $plan)
    {
        $formData = $request->validated();
        // dd($formData);
        DB::beginTransaction();
        try {
            
            $plan->update([
                'name' => $formData['name'],
                'privacy' => $formData['privacy'],
                'is_group_plan' => $formData['is_group_plan'],
                'modified_by' => Auth::id()
            ]);

            if($formData['is_group_plan']){
                $plan->departments()->sync($formData['departments']);
                
            }else{
                $plan->users()->sync($formData['users']);
                
            }

            DB::commit();

            // return Inertia::location(route('plans.show', $plan));
            return to_route('plans.edit', $plan)
            ->with('response', [
                'error' => false,
                'message' => 'Plan updated successfully!',
            ])
            // ->with('plan', $plan)
            ->setStatusCode(303);

        } catch(Exception $e) {
            DB::rollBack();
            return back()->with('response',[
                'error' => true,
                'message' => 'User update failed' . $e->getMessage()
            ], 500)->withInput();
        }
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
