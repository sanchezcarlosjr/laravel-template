<?php


namespace App\GraphQL\Queries;

use App\Models\Sni;

class SniStatistics
{
    public function __invoke($_, array $args)
    {
        $immutableModel = new ImmutableModel(Sni::getModel(), collect([
            ["name" => "campus", "arg" => "campus"],
            ["name" => "terms", "arg" => "terms"],
            ["name" => "closeToRetirement", "arg" => "close_to_retirement"],
            ["name" => "closeToExpire", "arg" => "close_to_expire"]
        ]), $args);
        $datasets =  $immutableModel->generateDatasetBy('gender', collect([
                [
                    'id' => "Mujeres",
                    'label' => 'Mujeres',
                    'gender' => 'Mujer',
                    'stack' => 'Investigadores'
                ],
                [
                    'id' => "Hombres",
                    'label' => 'Hombres',
                    'gender' => 'Hombre',
                    'stack' => 'Investigadores'
                ],
                [
                    'id' => "NA",
                    'label' => 'No especificado',
                    'gender' => 'NA',
                    'stack' => 'Investigadores',
                ]
            ]
        ));
        return [
            'periods' => [$args["to"]],
            'datasets' => $datasets
        ];
    }
}
