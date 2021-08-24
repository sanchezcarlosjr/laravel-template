<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Rubros extends Migration
{
use Production;use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prodep_rubros', function (Blueprint $table) {
            $table->id();
            $table->decimal('monto');
            $table->boolean('autorizado');
            $table->string('nombre');
            /** Polymorph */
            $table->integer('rubreable_id');
            $table->string('rubreable_tipo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prodep_rubros');
    }
}
