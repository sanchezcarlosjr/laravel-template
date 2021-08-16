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
            'tipo' => $this->faker->creditCardType,
            'clase' => $this->faker->firstName,
            'rango' => $this->faker->lastName,
            'fecha_inicio' => $this->faker->date,
            'fecha_fin' => $this->faker->date,
            'cuerpos_academico_id' => $this->faker->numberBetween($min = 1, $max = 10)
        ];
    }
}
