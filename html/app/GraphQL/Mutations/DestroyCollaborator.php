<?php


namespace App\GraphQL\Mutations;


use App\Models\Employee;

class DestroyCollaborator
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $employee = Employee::find($args['id']);
        $employee->collaborator_academic_bodies()->detach($args['academic_body_id']);
        return $employee;
    }
}
