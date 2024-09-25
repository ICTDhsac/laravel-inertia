<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'name' => $this->faker->unique()->word, // Random word as role name
            'name' => $this->faker->unique()->randomElement(['System Administrator', 'User', 'Administrator', 'Editor', 'Developer']),
            'created_by' => null,
            'modified_by' => null
        ];
    }
}
