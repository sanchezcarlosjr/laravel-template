<?php

namespace Database\Factories;

use App\Models\ProdepNPTC;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProdepNPTCFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProdepNPTC::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "fecha_inicio" => $this->faker->date,
        ];
    }
}
