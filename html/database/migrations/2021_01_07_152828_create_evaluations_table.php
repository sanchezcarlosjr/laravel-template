<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluationsTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('evaluaciones_cuerpos_academicos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio');
            $table->date('fecha_fin')->nullable();
            $table->string('grado');
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
        $this->dropInLocalNoProduction('evaluaciones_cuerpos_academicos');
    }
}
