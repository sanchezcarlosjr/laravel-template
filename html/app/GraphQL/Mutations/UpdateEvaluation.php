<?php


namespace App\GraphQL\Mutations;


use App\Models\Evaluation;

class UpdateEvaluation
{
    use FinishDateFromStartDate;

    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $evaluation = Evaluation::find($args['id']);
        $args = $this->calculateFinishDateFromStartDate($args);
        $evaluation->grade = $args['grade'];
        $evaluation->finish_date = $args['finish_date'];
        $evaluation->start_date = $args['start_date'];
        return $evaluation->save();
    }
}
