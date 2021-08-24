<?php

namespace Database\Migrations;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Schema;

trait Production
{
    public function upInLocalOrProduction($name, $create, $update = null)
    {
        if (App::environment('production') && isset($update)) {
            Schema::table($name, $update);
        } else if(isset($update)) {
            Schema::create($name, $create);
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
        if (!App::environment('production') && isset($destroy)) {
            $destroy();
        } else if (isset($update)) {
            $update();
        }
    }
}
