<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder;

class Employee
{
    public function filter(Builder $builder, array $filter): Builder
    {
        if (count($filter) == 0) {
            return $builder;
        }
        return $this->name_like($builder, $filter[0]);
    }

    public function is_lgac_member(Builder $builder, bool $m): Builder
    {
        return $builder->has('academic_bodies_lgacs', ($m ? '>' : '<='), 0);
    }

    /**
     * @param Builder $builder
     * @param String $nameOrId
     * @return Builder
     */
    private function name_like(Builder $builder, string $nameOrId): Builder
    {
        return $builder->where(function ($query) use ($nameOrId) {
            $query->where("nombre", "ILIKE", "%" . $nameOrId . "%")
                ->orWhere("amaterno", "ILIKE", "%" . $nameOrId . "%")
                ->orWhere("apaterno", "ILIKE", "%" . $nameOrId . "%")
                ->orWhere("nempleado", "ILIKE", "%" . $nameOrId . "%");
        });
    }
}
