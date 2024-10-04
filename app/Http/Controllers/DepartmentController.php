<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Location;
use App\Models\Office;

class DepartmentController extends Controller
{
    protected $title = 'Divisions';
    protected $navigationLinks = [
        [
            'link' => '#',
            'icon' => 'ShieldCheck',
            'label' => 'System Administration'
        ],
        [
            'link' => '#',
            'icon' => 'Building',
            'label' => 'Divisions'
        ]
    ];

    public function index()
    {
        $navigationLinks = $this->navigationLinks;
        $departments = Department::withCount('users')
                    ->with([
                        'departmentHead:id,first_name,last_name,middle_name',                // Eager load office with specific fields
                        'office:id,name,location_id',                // Eager load office with specific fields
                        'office.location:id,name'
                    ])
                    ->get();
        // dd($departments[0]->departmentHead->full_name);
        $offices = Office::query()->select('id', 'name')->get();
        $locations = Location::query()->select('id', 'name')->get();
        // dd($departments->toArray());
        return inertia('HRMIS/Departments/Index', compact('departments', 'offices', 'locations', 'navigationLinks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
    }

    public function getTitle()
    {
        return $this->title;
    }
}
