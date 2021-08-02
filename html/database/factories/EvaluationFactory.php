<?php

namespace Database\Factories;

use App\Models\Evaluation;
use Illuminate\Database\Eloquent\Factories\Factory;

class EvaluationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string

     */
    protected $model = Evaluation::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'fecha_inicio' => $this->faker->date,
            'fecha_fin' => $this->faker->date,
            'grado' => $this->faker->numberBetween(0, 2),
            'cuerpo_academico_id' => $this->faker->numberBetween($min = 1, $max = 100)
        ];
    }
}
