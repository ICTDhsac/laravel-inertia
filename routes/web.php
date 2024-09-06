<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
// use Inertia\Inertia;

Route::get('/', [TaskController::class, 'index'])->name('tasks.index');

Route::resource('tasks', TaskController::class)->except('index');
Route::resource('posts', PostController::class);
