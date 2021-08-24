<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityPhotosTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('pit_actividades_fotos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('url');
            $table->integer('pit_actividad_id')->unsigned();
            $table->foreign('pit_actividad_id')->references('id')->on('pit_actividades')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->dropInLocalNoProduction('pit_actividades_fotos');
    }
}
