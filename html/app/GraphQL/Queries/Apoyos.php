<?php

namespace App\GraphQL\Queries;

use Illuminate\Database\Eloquent\Builder;

use App\Models\Help;
use App\Models\ProdepHelp;

class Apoyos
{
  public function __invoke($root, array $args)
  {
    return ProdepHelp::all()->get();
  }
}
