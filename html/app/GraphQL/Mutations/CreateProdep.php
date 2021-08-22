<?php

namespace App\GraphQL\Mutations;
use App\Models\Prodep;

class CreateProdep
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return Prodep::create($args);
    }
}
