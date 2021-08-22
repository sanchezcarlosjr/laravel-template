<?php

namespace Database\Factories;

use App\Models\Researcher;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResearcherFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Researcher::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "valid" => $this->faker->date,
            "probative" => $this->faker->date
        ];
    }
}
