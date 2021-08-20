<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductionSeeder extends Seeder
{
    use Csv;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insertRoles();
        $this->insertAreasSni();
        $this->insertProdepAreas();
    }

    private function insertAreasSni() {
        DB::table('areas_sni')->insert([
            ['nombre' => 'Área I Físico-matemáticas y ciencias de la tierra'],
            ['nombre' => 'Área II Biología y química'],
            ['nombre' => 'Área III Medicina y ciencias de la salud'],
            ['nombre' => 'Área IV Ciencias de la conducta y la educación'],
            ['nombre' => 'Área V Humanidades'],
            ['nombre' => 'Área VI Ciencias sociales'],
            ['nombre' => 'Área VII Ciencias de agricultura, agropecuarias, forestales y de ecosistemas'],
            ['nombre' => 'Área VIII Ingenierías y desarrollo tecnológico'],
            ['nombre' => 'Área IX Interdisciplinaria']
        ]);
    }

    private function insertRoles()
    {
        DB::table('roles')->insert([
            ['rol' => 'Admnistrador'],
            ['rol' => 'Coordinador general'],
            ['rol' => 'Coordinador de investigación y posgrado de UA'],
            ['rol' => 'Auxiliar SNI'],
            ['rol' => 'Auxiliar PRODEP'],
            ['rol' => 'Auxiliar cuerpos académicos'],
            ['rol' => 'Jefe de posgrados'],
            ['rol' => 'Jefe de investigación'],
            ['rol' => 'Auxiliar Posgrados'],
            ['rol' => 'Planeación'],
            ['rol' => 'Secretaría general'],
            ['rol' => 'Responsable de Campus'],
            ['rol' => 'Jefe Propiedad Intelectual y T'],
            ['rol' => 'Responsable de Campus'],
            ['rol' => 'Auxiliar PIT']
        ]);
        DB::table('modulos')->insert([
            ['modulo' => '/inicio'],
            ['modulo' => '/usuarios'],
            ['modulo' => '/cuerpos-academicos'],
            ['modulo' => '/cuerpos-academicos/miembros'],
            ['modulo' => '/cuerpos-academicos/lgac'],
            ['modulo' => '/cuerpos-academicos/evaluaciones'],
            ['modulo' => '/cuerpos-academicos/redes'],
            ['modulo' => '/cuerpos-academicos/apoyos'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/editar'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/evaluaciones'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/lgac'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/miembros'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/redes'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/colaboradores'],
            ['modulo' => '/sni'],
            ['modulo' => '/prodep'],
            ['modulo' => '/prodep/apoyos'],
            ['modulo' => '/prodep/nptcs'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/apoyos'],
            ['modulo' => '/cuerpos-academicos/:academic_body_id/detalles']
        ]);
        DB::table('permisos')->insert([
            ['modulo_id' => 1, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 4, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 5, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 6, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 7, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 8, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 9, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 10, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 11, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 12, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 13, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 14, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 15, 'rol_id' => 6, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 16, 'rol_id' => 6, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 17, 'rol_id' => 6, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 18, 'rol_id' => 6, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 19, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 20, 'rol_id' => 6, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 1, 'rol_id' => 4, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 4, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 5, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 6, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 7, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 8, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 9, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 10, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 11, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 12, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 13, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 14, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 15, 'rol_id' => 4, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 16, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 17, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 18, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 19, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 20, 'rol_id' => 4, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 1, 'rol_id' => 5, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 4, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 5, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 6, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 7, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 8, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 9, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 10, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 11, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 12, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 13, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 14, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 15, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 16, 'rol_id' => 5, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 17, 'rol_id' => 5, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 18, 'rol_id' => 5, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 19, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => true, 'destruir' => false],
            ['modulo_id' => 20, 'rol_id' => 5, 'crear' => false, 'editar' => false, 'leer' => false, 'destruir' => false],
            ['modulo_id' => 1, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 2, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 4, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 5, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 6, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 7, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 8, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 9, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 10, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 11, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 12, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 13, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 14, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 15, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 16, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 17, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 18, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 19, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 20, 'rol_id' => 1, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 1, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 4, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 5, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 6, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 7, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 8, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 9, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 10, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 11, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 12, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 13, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 14, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 15, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 16, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 17, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 18, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 19, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 20, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 1, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 3, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 4, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 5, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 6, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 7, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 8, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 9, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 10, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 11, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 12, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 13, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 14, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 15, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 16, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 17, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 18, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 19, 'rol_id' => 3, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
            ['modulo_id' => 20, 'rol_id' => 2, 'crear' => true, 'editar' => true, 'leer' => true, 'destruir' => true],
        ]);
    }


    private function insertProdepAreas()
    {
        DB::table('areas_prodep')->insert([
            ['nombre' => 'Ciencias Agropecuarias'],
            ['nombre' => 'Ciencias Naturales y Exactas'],
            ['nombre' => 'Ciencias de la Salud'],
            ['nombre' => 'Ciencias Sociales y Administrativas'],
            ['nombre' => 'Educación, Humanidades y Arte'],
            ['nombre' => 'Ingeniería y Tecnología']
        ]);
        $areas_prodep = $this->readCSV("database/legacy/disciplinas_prodep.csv",array('delimiter' => ','));
        DB::table('disciplinas_prodep')->insert($areas_prodep->toArray());
    }
}
