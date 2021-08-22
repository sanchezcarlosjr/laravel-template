<?php

namespace Database\Factories;

use App\Models\ActivitiesPit;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActivitiesPitFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ActivitiesPit::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "kind_of_applicant" => $this->faker->name,
            "name_event" => $this->faker->name,
            "asistence" => $this->faker->name,
            "goal" => $this->faker->name,
            "date" => $this->faker->date,
            "academic_unit_id" => $this->faker->randomElement($array = array(114, 122, 123, 175)),
        ];
    }
}
