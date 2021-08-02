<?php

namespace App\GraphQL\Mutations;
use App\Models\LGAC;

class UpdateLgac
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($root, array $args)
    {
        $args = $args['data'];
        LGAC::find($args['id'])->update($args);
        return LGAC::find($args['id']);
    }
}
