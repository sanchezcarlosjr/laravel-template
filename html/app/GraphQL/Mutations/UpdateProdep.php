<?php

namespace App\GraphQL\Mutations;
use App\Models\Prodep;

class UpdateProdep
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        Prodep::find($args[id])->update($args);
return Prodep::find($args[id]);
    }
}
