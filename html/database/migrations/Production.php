<?php

namespace Database\Migrations;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;

trait Production
{
    public function upInLocalOrProduction($name, $create, $update = null)
    {
        if (!App::environment('production')) {
            Schema::create($name, $create);
        }
        if (App::environment('production') && isset($update)) {
            Schema::table($name, $update);
        }
    }

    public function dropInLocalNoProduction($name)
    {
        if (!App::environment('production')) {
            Schema::dropIfExists($name);
        }
    }

    public function downInLocalOrProduction($destroy, $update = null)
    {
        if (!App::environment('production')) {
            $destroy();
        }
    }
}
