<?php

namespace Database\Seeders;

use App\Models\{AcademicUnit, ActivitiesPit, DES, User};
use App\Models\AcademicBody;
use App\Models\Employee;
use App\Models\Evaluation;
use App\Models\Help;
use App\Models\LGAC;
use App\Models\Network;
use App\Models\ProdepDiscipline;
use App\Models\ProdepHelp;
use App\Models\ProdepNPTC;
use App\Models\ProdepProfile;
use App\Models\Researcher;
use App\Models\Sni;
use App\Models\SNIArea;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends ProductionSeeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        parent::run();
        #DES::factory(10)->create();
        #AcademicUnit::factory(100)->create();
        Employee::factory(10)->has(User::factory())->create();
        AcademicBody::factory(200)->create();
        Employee::factory(100)->has(LGAC::factory(), 'academic_bodies_lgacs')->create();
        Employee::factory(100)->has(AcademicBody::factory(), 'collaborator_academic_bodies')->create();
        Employee::factory(100)->has(Help::factory()->count(3))->create();
        Employee::factory(10)->has(ProdepProfile::factory()->count(3), 'prodep_profiles')->create();
        Employee::factory(5)->has(ProdepHelp::factory()->count(3), 'prodep_helps')->create();
        Employee::factory(5)->has(ProdepNPTC::factory()->count(3), 'prodep_nptcs')->create();
        Employee::factory(5)->has(Sni::factory()->count(5), 'snis')->create();
        LGAC::factory(200)->create();
        Evaluation::factory(200)->create();
        Network::factory(200)->create();
        //        ActivitiesPit::factory()->create();
    }
}
