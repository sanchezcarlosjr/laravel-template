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
            'name' => $this->faker->country,
            'type' => $this->faker->creditCardType,
            'class' => $this->faker->firstName,
            'range' => $this->faker->lastName,
            'start_date' => $this->faker->date,
            'finish_date' => $this->faker->date,
            'academic_body_id' => $this->faker->numberBetween($min = 1, $max = 10)
        ];
    }
}
