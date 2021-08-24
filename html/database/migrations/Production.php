<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\App;

trait Production
{
    public function upInLocalOrProduction($name, $create, $update = null) {
        if (App::environment('production')) {
            Schema::table($name, $update);
        } else {
            Schema::create($name, $create);
        }
    }
    public function dropInLocalNoProduction($name) {
        if (!App::environment('production')) {
            Schema::dropIfExists('$name');
        }
    }
    public function downInLocalOrProduction($destroy, $update = null) {
        if (!App::environment('production') && isset($destroy)) {
            $destroy();
        } else if (isset($update)){
            $update();
        }
    }
}
