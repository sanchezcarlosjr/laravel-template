<?php

namespace Database\Factories;

use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nempleado' => $this->faker->numberBetween($min = 1000, $max = 10000000),
            'nombre' => $this->faker->userName,
            'apaterno' => $this->faker->lastName,
            'amaterno' => $this->faker->lastName,
            'correo1' => $this->faker->email,
            'sexo' => $this->faker->randomElement($array = array('M', 'F', 'NA')),
            'grado' => $this->faker->randomElement($array = array('A', 'B', 'C', 'D')),
            'nunidad' => $this->faker->randomElement($array = array(114, 122, 123, 175)),
            'c_categoria' => $this->faker->numberBetween($min = 100, $max = 120),
            'f_nacimiento' => Carbon::instance($this->faker->dateTimeBetween($startDate = '-100 years', $endDate = '31-12-1995'))->format(Employee::birthdayFormat),
            'estatus' => $this->faker->randomElement($array = array('1', '0'))
        ];
    }
}
