<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Employee2 extends Model
{
    use HasFactory;

    protected $fillable = ['cvu', 'curp', 'nempleado'];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'nempleado');
    }

    public function scopeTerms(Builder $query)
    {
        return $query;
    }
}
