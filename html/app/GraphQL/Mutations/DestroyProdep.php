<?php

namespace App\GraphQL\Mutations;
use App\Models\Prodep;

class DestroyProdep
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return Prodep::destroy($args[id]);
    }
}
