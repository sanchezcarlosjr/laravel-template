<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventorPitsTable extends Migration
{
    use Production;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $this->upInLocalOrProduction('pit_inventores', function (Blueprint $table) {
            $table->id();
            $table->integer('invencion_id')->unsigned();
            $table->foreign('invencion_id')->references('id')->on('pit_invenciones')->onDelete('cascade');
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
        $this->dropInLocalNoProduction('pit_inventores');
    }
}
