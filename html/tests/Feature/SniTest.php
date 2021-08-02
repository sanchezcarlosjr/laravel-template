<?php


namespace Tests\Feature;

use App\GraphQL\Queries\SniStatistics;
use App\Models\Sni;
use App\Models\Employee;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class SniTest extends TestCase
{
    public function testShouldGetSnisThatMatchingWithMexicali()
    {
        $snis = Sni::campus('Mexicali')->get();
        $campus = $snis->map(function ($sni) {
            return $sni->employee()->get()[0]->academic_unit()->get()[0]->campus;
        });
        $this->assertContains("Mexicali", $campus);
        $this->assertNotContains("Ensenada", $campus);
        $this->assertNotContains("Tijuana", $campus);
    }

    public function testShouldGetSnisCloseToRetirement()
    {
        $snis = Sni::closeToRetirement()->get();
        $snis->map(function ($sni) {
            return $sni->employee()->get()[0]->age;
        })->each(function ($age) {
            $this->assertGreaterThanOrEqual(69, $age);
        });
    }

    public function testShouldGetSnisCloseToExpire()
    {
        $snis = Sni::closeToExpire()->get();
        $snis->map(function ($sni) {
            return $sni->finish_date;
        })->each(function ($finish_date) {
            $diff = Carbon::create($finish_date)->diffInMonths(Carbon::today());
            $this->assertLessThanOrEqual(6, $diff);
        });
    }
    public function testShouldGetMaleSnis() {
        $snis = Sni::gender('Hombre')->get();
        $snis->map(function ($sni) {
            return $sni->employee()->get()[0]->sexo;
        })->each(function ($sexo) {
            $this->assertEquals(Employee::Male, $sexo);
        });
    }
    public function testShouldGetSniByTerms() {
        $level1 = Sni::terms(["Nivel 1"])->count();
        $level2 = Sni::terms(["Nivel 2"])->count();
        $snis = Sni::terms(["Nivel 1", "Nivel 2"])->get();
        dd($snis);
        $this->assertEquals( $level1 + $level2, $snis->count());
    }
    public function testShouldGetStatistics() {
        $sni = new SniStatistics();
        $statistics = $sni(null, ['to'=> '2021-1', 'campus' => 'Tijuana']);
        $statistics["datasets"]->each(function ($item) {
            $this->assertContains($item["label"], ["Mujeres", "Hombres", "No especificado"]);
            $this->assertGreaterThanOrEqual($item["data"][0], 0);
        });
    }
}
