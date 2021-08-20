<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('miembros_cuerpos_academicos', function (Blueprint $table) {
            $table->id();
            $table->integer('lgac_cuerpos_academicos_id')->unsigned();
            $table->integer('nempleado')->unsigned();
            $table->softDeletes();
            $table->foreign('lgac_cuerpos_academicos_id')->references('id')->on('lgac_cuerpos_academicos')->onDelete('cascade');
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
        Schema::dropIfExists('miembros_cuerpos_academicos');
    }
}
