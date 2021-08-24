<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResearchersTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesores_investigadores', function (Blueprint $table) {
            $table->id();
            $table->date('vigenteHasta');
            $table->date('probatorio');
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
        Schema::dropIfExists('profesores_investigadores');
    }
}
