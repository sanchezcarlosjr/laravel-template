<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationalProgramNapsTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('programas_educativos_naps', function (Blueprint $table) {
            $table->id();
            $table->integer('programa_educativo_id')->unsigned();
            $table->foreign('programa_educativo_id')->references('id')->on('programas_educativos')->onDelete('cascade');
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
        $this->dropInLocalNoProduction('programas_educativos_naps');
    }
}
