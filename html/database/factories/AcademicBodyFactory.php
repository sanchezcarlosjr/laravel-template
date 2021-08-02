<?php

namespace Database\Factories;

use App\Models\AcademicBody;
use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicBodyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AcademicBody::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nombre' => $this->faker->word,
            'clave_prodep' => $this->faker->numberBetween($min = 1, $max = 100000000000),
            'vigente' => rand(0, 1) == 1,
            'area_prodep_id' => $this->faker->numberBetween($min = 1, $max = 10),
            'disciplina' => $this->faker->word,
            'des_id' => $this->faker->numberBetween($min = 1, $max = 5),
        ];
    }
}
