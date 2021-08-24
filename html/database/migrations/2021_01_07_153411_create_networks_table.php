<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNetworksTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
   {
        Schema::create('redes_cuerpos_academicos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('tipo')->nullable();
            $table->string('clase')->nullable();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('rango');
            $table->string('url_convenio')->nullable();
            $table->integer('lider_de_red_id')->unsigned()->nullable();
            $table->integer('cuerpo_academico_id')->unsigned();
            $table->foreign('cuerpo_academico_id')->references('id')->on('cuerpos_academicos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropColumns('redes_cuerpos_academicos', ['lider_de_red_id']);
        Schema::dropColumns('colaboradores_redes', ['cuerpos_academicos_redes_id']);
        Schema::dropIfExists('redes_cuerpos_academicos');
        Schema::dropIfExists('colaboradores_redes');
    }
}
