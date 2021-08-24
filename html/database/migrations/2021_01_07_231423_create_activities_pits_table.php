<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivitiesPitsTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pit_actividades', function (Blueprint $table) {
            $table->id();
            $table->string('tipo_de_solicitante');
            $table->string('nombre_del_evento');
            $table->string('url_asistencia');
            $table->string('objetivo');
            $table->date('fecha');
            $table->integer('nunidad')->unsigned();
            $table->foreign('nunidad')->references('nunidad')->on('unidades')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pit_actividades');
    }
}
