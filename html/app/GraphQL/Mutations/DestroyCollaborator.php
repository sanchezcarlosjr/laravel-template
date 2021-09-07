<?php


namespace App\GraphQL\Mutations;


use App\Models\Collaborator;
use App\Models\Employee;

class DestroyCollaborator
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        dd($args);
        $collaborator = Employee::find($args['id'])->collaborators();
        $employee = $collaborator->employee();
        $collaborator->delete();
        return $employee;
    }
}
