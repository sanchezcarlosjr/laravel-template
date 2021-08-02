<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModificationEducationalProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modificaciones_programas_educativos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('estatus_actual');
            $table->string('plan_proceso');
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
        Schema::dropIfExists('modificaciones_programas_educativos');
    }
}
