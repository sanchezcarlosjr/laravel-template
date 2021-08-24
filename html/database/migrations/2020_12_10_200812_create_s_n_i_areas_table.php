<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSNIAreasTable extends Migration
{
use Production;    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('areas_sni', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('areas_sni');
    }
}
