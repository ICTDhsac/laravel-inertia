<?php

use App\Events\SystemMaintenanceEvent;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

Route::resource('users', UserController::class);
Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
Route::put('/tasks-batch', [TaskController::class, 'updateBatch'])->name('tasks.updateBatch');
Route::resource('tasks', TaskController::class)->except('index');

Route::resource('posts', PostController::class);

Route::inertia('/about', 'OffCanvas');
Route::inertia('/drawer', 'DrawerComponent');


Route::get('test', function(){
    event(new SystemMaintenanceEvent('Hello World'));
});
