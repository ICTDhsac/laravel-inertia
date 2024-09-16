<?php

use App\Events\SystemMaintenanceEvent;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
Route::put('/tasks-batch', [TaskController::class, 'updateBatch'])->name('tasks.updateBatch');

Route::inertia('/about', 'OffCanvas');

Route::resource('tasks', TaskController::class)->except('index');
Route::resource('posts', PostController::class);

Route::get('test', function(){
    event(new SystemMaintenanceEvent('Hello World'));
});
