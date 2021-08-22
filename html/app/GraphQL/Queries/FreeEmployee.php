<?php


namespace App\GraphQL\Queries;


use Illuminate\Database\Eloquent\Builder;

class FreeEmployee
{
    public function __invoke(Builder $builder, int $academic_body_id): Builder
    {
        return $builder->whereHas('academic_bodies_lgacs', function (Builder $query) use ($academic_body_id) {
            $query->where('cuerpo_academico_id', '=', $academic_body_id);
        }, '=', 1)->orHas('academic_bodies_lgacs', '=', '0');
    }
}
