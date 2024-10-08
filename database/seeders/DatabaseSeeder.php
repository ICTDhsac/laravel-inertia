<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\Post;
use App\Models\Role;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Create single
        // User::factory(5)->create();
        // $role = Role::factory()->create();
        // $user->roles()->attach($role->id, ['password' => bcrypt('your_password_here')]);
        

        // Create multiple
        // $roles = Role::factory()->count(1)->create(); // Create 3 roles
        // $users = User::factory()->count(10)->create(); // Create 10 users
        // foreach ($users as $user) {
        //     foreach ($roles as $role) {
        //         // Create role_user entries
        //         $user->roles()->attach($role->id, ['password' => bcrypt('your_password_here')]);
        //     }
        // }

        // User::factory()
        //     ->has(Role::factory()->count(3))
        //     ->create();
        // Role::factory(1)->create();

        // $user->roles()->attach($role->id, ['password' => bcrypt('another_password')]);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Post::factory(25)->create();
        Task::factory(30)->create();
        // Plan::factory(5)->create();
    }
}
