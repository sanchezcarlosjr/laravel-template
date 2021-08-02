<?php

namespace Tests\Unit;

use App\GraphQL\Queries\AllEmployeesByAcademicBody;
use App\Models\AcademicBody;
use Tests\TestCase;

class AllEmployeesByAcademicBodyTest extends TestCase
{
    public function testNotShouldReturnArray()
    {
        $query = new AllEmployeesByAcademicBody;
        $academicBody = AcademicBody::find(1);
        $employees = $query($academicBody, []);
        $this->assertTrue(get_class($employees[0]) == 'App\Models\Employee');
        $this->assertTrue(count($employees) > 0);
    }
}
