<?php


namespace App\GraphQL\Mutations;


use App\Models\Collaborator;

class CreateCollaborator
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        return Collaborator::firstOrCreate([
            'academic_body_id' => $args['academic_body_id'],
            'employee_id' => $args['employees_id'],
        ]);
    }
}
