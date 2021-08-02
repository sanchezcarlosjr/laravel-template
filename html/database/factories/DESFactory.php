<?php

namespace Database\Factories;

use App\Models\DES;
use Illuminate\Database\Eloquent\Factories\Factory;

class DESFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = DES::class;
    private $id = 1;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'cdes' => $this->id++,
            'des' => $this->faker->word
        ];
    }
}
