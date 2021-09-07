<?php

namespace Database\Factories;

use App\Models\Network;
use Illuminate\Database\Eloquent\Factories\Factory;

class NetworkFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Network::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->country,
            'rango' => $this->faker->numberBetween($min = 0, $max = 3),
            'fecha_inicio' => $this->faker->date,
            'fecha_fin' => $this->faker->date,
            'cuerpo_academico_id' => $this->faker->numberBetween($min = 1, $max = 10)
        ];
    }
}
