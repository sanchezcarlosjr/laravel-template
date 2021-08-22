<?php

namespace App\GraphQL\Mutations;


use App\Models\ProdepProfile;

class CreateProdepProfiles
{
    use FinishDateFromStartDate;

    public function __invoke($_, array $args)
    {
        return ProdepProfile::create($this->calculateFinishDateFromStartDate($args));
    }
}
