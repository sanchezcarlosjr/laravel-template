<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityBooksTable extends Migration
{
    use Database\Migrations\Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('productividad_libros', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('autores');
            $table->string('tipo_de_participacion');
            $table->string('editorial');
            $table->string('editorial_url');
            $table->string('isbn');
            $table->string('doi');
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
        $this->dropInLocalNoProduction('productividad_libros');
    }
}
