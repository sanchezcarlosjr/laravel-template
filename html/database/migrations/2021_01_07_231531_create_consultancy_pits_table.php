<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsultancyPitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pit_asesorias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_aplicacion');
            $table->string('tipo_de_aplicacion');
            $table->string('motivo');
            $table->date('fecha');
            $table->integer('nunidad')->unsigned();
            $table->foreign('nunidad')->references('nunidad')->on('unidades')->onDelete('cascade');
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
        Schema::dropIfExists('pit_asesorias');
    }
}
