<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Sni;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class SniFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Sni::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "fecha_inicio" => $this->faker->date,
            "fecha_fin" => Carbon::instance($this->faker->dateTimeBetween($startDate = '31-12-2019', $endDate = '31-12-2024'))->toDateString(),
            "disciplina" => $this->faker->name,
            "campo" => $this->faker->name,
            'nivel' => $this->faker->randomElement($array = array("Candidato", "Nivel 1", "Nivel 2", "Nivel 3", "Emérito")),
            "especialidad" => $this->faker->name,
            "area_sni_id" => $this->faker->numberBetween($min = 1, $max = 9),
        ];
    }
}
