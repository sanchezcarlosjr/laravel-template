<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdepNPTCTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nptc_prodep', function (Blueprint $table) {
            $table->id();
            //$table->float('cantidad');
            //$table->string('tipo');
            $table->date('fecha_inicio');
            $table->boolean('extension')->nullable();
            $table->boolean('autorizado')->nullable();
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
        Schema::dropIfExists('nptc_prodep');
    }
}
