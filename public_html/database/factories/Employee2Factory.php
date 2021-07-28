<?php

namespace Database\Factories;

use App\Models\Employee2;
use Illuminate\Database\Eloquent\Factories\Factory;

class Employee2Factory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee2::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'cvu' => $this->faker->numberBetween(1, 4),
            'curp' => 'a'
        ];
    }
}
