<?php

namespace Database\Migrations;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;

trait Production
{
    public function upInLocalOrProduction($name, $create, $update = null)
    {
        Schema::create($name, $create);
    }

    public function dropInLocalNoProduction($name)
    {
        Schema::dropIfExists($name);
    }

    public function downInLocalOrProduction($destroy, $update = null)
    {
        $destroy();
    }
}
