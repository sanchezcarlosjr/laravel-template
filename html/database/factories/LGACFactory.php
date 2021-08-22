<?php

namespace Database\Factories;

use App\Models\LGAC;
use Illuminate\Database\Eloquent\Factories\Factory;

class LGACFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = LGAC::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->name,
            'descripcion' => $this->faker->word,
            'cuerpo_academico_id' => $this->faker->numberBetween($min = 1, $max = 10)
        ];
    }
}
