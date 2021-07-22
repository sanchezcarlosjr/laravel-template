<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdepAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('areas_prodep', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->integer('disciplina_prodep_id')->unsigned();
            $table->foreign('disciplina_prodep_id')->references('id')->on('disciplinas_prodep')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('areas_prodep');
    }
}
