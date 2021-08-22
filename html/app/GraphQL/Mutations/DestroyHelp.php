<?php

namespace App\GraphQL\Mutations;
use App\Models\Help;

class DestroyHelp
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        return Help::destroy($args['id']);
    }
}
