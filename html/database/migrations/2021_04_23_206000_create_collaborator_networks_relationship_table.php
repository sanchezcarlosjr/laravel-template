<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollaboratorNetworksRelationshipTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Shema::hasTable('colaboradores_redes') || Schema::hasTable('redes_cuerpos_academicos')) {
            return;
        }
        Schema::table('colaboradores_redes', function (Blueprint $table) {
            $table->foreign('cuerpos_academicos_redes_id')->references('id')->on('redes_cuerpos_academicos');
        });
        Schema::table('redes_cuerpos_academicos', function (Blueprint $table) {
            $table->foreign('lider_de_red_id')->references('id')->on('colaboradores_redes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
