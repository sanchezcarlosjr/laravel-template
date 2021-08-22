<?php

namespace Database\Factories;

use App\Models\SNIArea;
use Illuminate\Database\Eloquent\Factories\Factory;

class SNIAreaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = SNIArea::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->name
        ];
    }
}
