<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityInnovationsTable extends Migration
{
    use Database\Migrations\Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('productividad_innovacion', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('autores');
            $table->string('tipo');
            $table->string('publicado_en');
            $table->string('numero_de_registro');
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
        $this->dropInLocalNoProduction('productividad_innovacion');
    }
}
