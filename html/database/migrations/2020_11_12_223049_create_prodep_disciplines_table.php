<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdepDisciplinesTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('disciplinas_prodep', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->integer('area_prodep_id')->unsigned();
            $table->foreign('area_prodep_id')->references('id')->on('areas_prodep')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->dropInLocalNoProduction('disciplinas_prodep');
    }
}
