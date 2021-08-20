<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventionPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pit_invenciones', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('estado_de_invencion');
            $table->string('tipo');
            $table->date('fecha_de_solicitud');
            $table->date('fecha_de_otorgamiento');
            $table->integer('cantidad_de_peticiones');
            $table->integer('proyecto_cgip_id')->unsigned();
            $table->integer('nempleado')->unsigned();
            $table->foreign("nempleado")->references('nempleado')->on('empleados')->onDelete('cascade');
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
        Schema::dropIfExists('pit_invenciones');
    }
}
