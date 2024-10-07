<?php

use App\Events\SystemMaintenanceEvent;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

// use Inertia\Inertia;



// Display login page
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/register', [RegisterController::class, 'showRegisterForm']);
Route::post('/register', [RegisterController::class, 'register']);

Route::resource('users', UserController::class);
Route::resource('departments', DepartmentController::class);
Route::resource('positions', PositionController::class);
Route::resource('offices', OfficeController::class);

Route::resource('plans', PlanController::class);

Route::post('/upload_user_photo', [UserController::class, 'upload'])->name('upload_user_photo');

Route::resource('users.tasks', TaskController::class);

// Route::get('/', [TaskController::class, 'index']);
Route::put('/tasks-batch', [TaskController::class, 'updateBatch'])->name('tasks.updateBatch');
Route::resource('tasks', TaskController::class);

Route::resource('posts', PostController::class);

Route::inertia('/about', 'OffCanvas');
Route::inertia('/drawer', 'DrawerComponent');

Route::inertia('/shad', 'Payments/Page');

Route::get('test', function(){
    event(new SystemMaintenanceEvent('Hello World'));
});



// Route::resource('tasks', TaskController::class)->except('index');