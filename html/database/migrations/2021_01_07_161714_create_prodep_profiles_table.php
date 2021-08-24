<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdepProfilesTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prodep_perfiles', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->integer('nempleado')->unsigned();
            $table->integer('prodep_area_id')->unsigned();
            $table->foreign('nempleado')->references('nempleado')->on('empleados')->onDelete('cascade');
            $table->foreign('prodep_area_id')->references('id')->on('areas_prodep')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prodep_perfiles');
    }
}
