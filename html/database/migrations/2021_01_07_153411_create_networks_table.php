<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNetworksTable extends Migration
{
    use Database\Migrations\Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('redes_cuerpos_academicos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->smallInteger('tipo')->nullable();
            $table->smallInteger('clase')->nullable();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->smallInteger('rango');
            $table->string('url_convenio')->nullable();
            $table->integer('lider_de_red_id')->unsigned()->nullable();
            $table->integer('cuerpo_academico_id')->unsigned();
            $table->foreign('cuerpo_academico_id')->references('id')->on('cuerpos_academicos')->onDelete('cascade');
        }, function (Blueprint $table) {
            $table->smallInteger('tipo');
            $table->smallInteger('clase');
            $table->smallInteger('rango');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->downInLocalOrProduction(function () {
            Schema::disableForeignKeyConstraints();
            Schema::dropIfExists('redes_cuerpos_academicos');
            Schema::dropIfExists('colaboradores_redes');
        });
    }
}
