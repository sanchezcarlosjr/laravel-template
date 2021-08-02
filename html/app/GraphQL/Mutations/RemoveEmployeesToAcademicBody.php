<?php

namespace App\GraphQL\Mutations;

use App\Models\Employee;

class RemoveEmployeesToAcademicBody
{
    public function __invoke($_, array $args)
    {
        Employee::find($args['id'])->academic_bodies_lgacs()->wherePivot('employee_id', '=', $args['id'])->detach();
        return Employee::find($args['id']);
    }
}
