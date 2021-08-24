<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdepAreasTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('areas_prodep', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->dropInLocalNoProduction('areas_prodep');
    }
}
