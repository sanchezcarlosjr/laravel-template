<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalProgramEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluaciones_programas_educativos', function (Blueprint $table) {
            $table->id();
            $table->date('vigente_hasta');
            $table->string('plan_proceso');
            $table->string('nivel_pnpc');
            $table->timestamps();
            $table->integer('programa_educativo_id')->unsigned();
            $table->foreign('programa_educativo_id')->references('id')->on('programas_educativos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluaciones_programas_educativos');
    }
}
