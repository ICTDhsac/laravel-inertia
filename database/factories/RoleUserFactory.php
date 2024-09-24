<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RoleUserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = \Illuminate\Database\Eloquent\Model::class;
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Create a new user
            'role_id' => Role::factory(), // Create a new role
            'password' => static::$password ??= Hash::make('password'),
        ];
    }
}
