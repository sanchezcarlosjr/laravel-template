<?php

namespace App\GraphQL\Mutations;
use App\Models\Evaluation;

class CreateEvaluation
{
    use FinishDateFromStartDate;
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        return Evaluation::create($this->calculateFinishDateFromStartDate($args));
    }
}
