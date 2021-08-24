<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuthorPitsTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pit_autores', function (Blueprint $table) {
            $table->id();
            $table->integer('derecho_id')->unsigned();
            $table->foreign('derecho_id')->references('id')->on('pit_derechos')->onDelete('cascade');
            $table->integer('nempleado')->unsigned();
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
        Schema::dropIfExists('pit_autores');
    }
}
