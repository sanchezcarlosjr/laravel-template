<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePESTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programas_educativos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('grado');
            $table->string('orientacion');
            $table->string('modalidad');
            $table->integer('sni_areas_id')->unsigned();
            $table->string('url_pagina');
            $table->string('ciclo_de_ingreso');
            $table->string('plan_vigente');
            $table->string('estatus_uabc');
            $table->integer('sede_id')->unsigned();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programas_educativos');
    }
}
