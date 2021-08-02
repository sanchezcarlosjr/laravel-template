<?php

namespace Database\Factories;

use App\Models\ProdepProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProdepProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProdepProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'fecha_inicio' => $this->faker->date,
            'fecha_fin' => $this->faker->dateTimeBetween($startDate = 'now', $endDate = '+10 years', $timezone = null),
            'prodep_area_id' => $this->faker->numberBetween($min=1, $max=6)
        ];
    }
}
