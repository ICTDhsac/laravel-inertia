<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'status' => fake()->randomElement(['TO DO', 'IN PROGRESS', 'BACKLOGS', 'CANCELLED', 'COMPLETED']),
            'body' => fake()->text(),
            'sortIndex' => $this->faker->numberBetween(0, 100)
        ];
    }
}
