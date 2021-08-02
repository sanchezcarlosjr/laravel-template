<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class ImmutableModel
{
    private $model;
    private $filter;
    private $criteria;

    public function __construct(
        Model $model,
        Collection $filter,
        array $criteria
    )
    {
        $this->model = $model;
        $this->filter = $filter;
        $this->criteria = $criteria;
    }

    public function generateDatasetBy(string $filter, Collection $criteria)
    {
        if (isset($this->criteria[$filter])) {
            $criteria = $criteria->filter(function (array $item) use ($filter) {
                return $this->criteria[$filter] == $item[$filter];
            });
        }
        $actual = time();
        return $criteria->reduce(function (Collection $carry, array $item) use ($actual, $filter) {
            $this->newModel();
            return $carry->push(array_merge($item,["id" => "{$item["id"]}-{$actual}", "data" => [$this->model->{$filter}($item[$filter])->get()->unique('nempleado')->count()]]));
        }, collect());
    }

    public function newModel(): ImmutableModel
    {
        $this->model = $this->model->getModel();
        $this->filter->each(function ($filter) {
            if (isset($this->criteria[$filter["arg"]])) {
                $this->model = $this->model->{$filter["name"]}($this->criteria[$filter["arg"]]);
            }
        });
        return $this;
    }
}
