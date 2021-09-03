<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

class Researcher extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "profesores_investigadores";
    protected $fillable = ["vigenteHasta", "probatorio", "nempleado"];

    public function employee()
    {
        return $this->belongsTo(Employee::class, "nempleado");
    }

    public function scopeTerms($query, $terms)
    {
        if (empty($terms)) {
            return $query;
        }
        return $query->joinSub(Employee::terms($terms), 'employee', function ($join) {
            $join->on('profesores_investigadores.nempleado', '=', 'employee.nempleado');
        });
    }

    public function scopeCampus(Builder $query, string $campus): Builder
    {
        $employees = Employee::campus($campus);
        return $query->joinSub($employees, 'employeeCampus', function ($join) {
            $join->on('profesores_investigadores.nempleado', '=', 'employeeCampus.nempleado');
        });
    }

    public function scopeValidity($query, $value)
    {
        $op = ($value == "Vigente") ? ">" : "<=";
        return $query->where('vigenteHasta', $op, Carbon::now());
    }

    public function scopeGender(Builder $query, string $gender)
    {
        $employees = Employee::gender($gender);
        return $query->joinSub($employees, 'employeeByGender', function ($join) {
            $join->on('profesores_investigadores.nempleado', '=', 'employeeByGender.nempleado');
        });
    }
}
