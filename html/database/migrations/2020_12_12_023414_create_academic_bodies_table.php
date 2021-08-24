<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcademicBodiesTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('cuerpos_academicos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('clave_prodep')->unique();
            $table->boolean('vigente');
            $table->integer('area_prodep_id')->unsigned();
            $table->integer('nempleado_lider')->unsigned()->nullable();
            $table->string('disciplina');
            $table->integer('des_id')->unsigned();
            $table->timestamps();
            $table->foreign('nempleado_lider')->references('nempleado')->on('empleados')->onDelete('cascade');
            $table->foreign('des_id')->references('cdes')->on('des')->onDelete('cascade');
            $table->foreign('area_prodep_id')->references('id')->on('areas_prodep')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->dropInLocalNoProduction('cuerpos_academicos');
    }
}
