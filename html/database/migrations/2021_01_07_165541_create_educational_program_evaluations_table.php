<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalProgramEvaluationsTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('evaluaciones_programas_educativos', function (Blueprint $table) {
            $table->id();
            $table->date('vigente_hasta');
            $table->string('plan_proceso');
            $table->string('nivel_pnpc');
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
        $this->dropInLocalNoProduction('evaluaciones_programas_educativos');
    }
}
