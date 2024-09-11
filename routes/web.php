<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
Route::put('/tasks-batch', [TaskController::class, 'updateBatch'])->name('tasks.updateBatch');

Route::resource('tasks', TaskController::class)->except('index');
Route::resource('posts', PostController::class);
