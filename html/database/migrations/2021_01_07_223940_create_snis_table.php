<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSnisTable extends Migration
{
    use Database\Migrations\Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('snis', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('disciplina');
            $table->string('campo');
            $table->string('nivel');
            $table->string('especialidad');
            $table->string('nombramiento_url')->nullable();
            $table->integer('nempleado')->unsigned();
            $table->integer('area_sni_id')->unsigned();
            $table->foreign('area_sni_id')->references('id')->on('areas_sni')->onDelete('cascade');
            $table->foreign('nempleado')->references('nempleado')->on('empleados')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->dropInLocalNoProduction('snis');
    }
}
