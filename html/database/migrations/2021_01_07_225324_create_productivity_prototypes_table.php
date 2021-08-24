<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductivityPrototypesTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('productividad_prototipos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('autores');
            $table->string('numero_de_registro');
            $table->date('fecha_de_publicacion');
            $table->string('tipo');
            $table->string('instituto');
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
        $this->dropInLocalNoProduction('productividad_prototipos');
    }
}
