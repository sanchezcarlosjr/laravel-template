<?php


namespace App\GraphQL\Mutations;


trait FinishDateFromStartDate
{
    function calculateFinishDateFromStartDate(array $args): array
    {
        $args['finish_date'] = $args['start_date']->copy()->addYear($args['years_to_finish']);
        return $args;
    }
}
