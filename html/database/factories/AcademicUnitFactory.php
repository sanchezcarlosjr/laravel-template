<?php

namespace Database\Factories;

use App\Models\AcademicUnit;
use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicUnitFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AcademicUnit::class;
    private $id = 100;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nunidad' => $this->id++,
            'unidad' => $this->faker->word,
            'campus' => $this->faker->randomElements($array = array ('Ensenada','Tijuana','Mexicali'), $count = 1)[0],
        ];
    }
}
