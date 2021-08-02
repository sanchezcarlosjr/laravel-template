<?php


namespace Tests\Feature;


use App\GraphQL\Queries\AcademicBodyStatistics;
use Tests\TestCase;

class AcademicBodyStatisticsTest extends TestCase
{
    public function testStatistics()
    {
        $academicBodyStatistics = new AcademicBodyStatistics;
        $statistics = $academicBodyStatistics(null, array());
        dd($statistics);
        $this->assertTrue(true);
    }

}
