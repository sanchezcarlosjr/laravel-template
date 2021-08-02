<?php

namespace App\GraphQL\Queries;

use App\Models\AcademicBody;

class LastEvaluation
{
    /**
     * @param AcademicBody $academicBody
     * @param array<string, mixed> $args
     */
    public function __invoke($academicBody, array $args = array())
    {
        return $academicBody->evaluations->sortBy('finish_date')->get(0);
    }
}
