<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::orderBy('sortIndex')->latest()->get();
        $members = User::all();
        return inertia('Planner/Tasks/Index', compact("tasks", "members"));
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
    public function store(StoreTaskRequest $request)
    {
        Task::create($request->validated());
        return redirect()->back()->with('response', [
            'error' => false,
            'message' => 'Task created successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    public function updateBatch(Request $request)
    {
        $tasks = $request->tasks;

        foreach ($tasks as $task) {
            Task::where('id', $task['id'])
                ->update(['sortIndex' => $task['sortIndex'], 'status' => $task['status']]);
        }

        return redirect('/')->with('response', [
            'error' => false,
            'message' => "Task sort index updated successfully!"
        ]);

        // return Inertia::render('Tasks/Index', [
        //     'tasks' => Task::orderBy('sortIndex')->get()
        // ])->with('response', [
        //     'error' => false,
        //     'message' => 'Sort Index updated successfully!'
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        sleep(2);
        $task->delete();
        return redirect('/')->with('response', [
            'error' => false,
            'message' => "Task \"". $task->title . "\" deleted successfully!"
        ]);
    }
}
