<?php

namespace App\GraphQL\Mutations;
use App\Models\Employee;

class UpdateEmployee
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($root, array $args)
    {
        Employee::find($args['id'])->update(['ncuerpo_academico' => $args['ncuerpo_academico']]);
        return Employee::find($args['id']);
    }
}
