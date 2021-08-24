<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHelpsTable extends Migration
{
    use Database\Migrations\Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('apoyos_cuerpos_academicos', function (Blueprint $table) {
            $table->id();
            $table->float('monto');
            $table->string('tipo');
            $table->string('reporte_url')->nullable();
            $table->string('liberacion_url')->nullable();
            $table->date('fecha');
            $table->timestamps();
            $table->integer('cuerpo_academico_id')->unsigned();
            $table->foreign('cuerpo_academico_id')->references('id')->on('cuerpos_academicos')->onDelete('cascade');
            $table->integer('nempleado_beneficiado')->unsigned();
            $table->foreign('nempleado_beneficiado')->references('nempleado')->on('empleados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->dropInLocalNoProduction('apoyos_cuerpos_academicos');
    }
}
