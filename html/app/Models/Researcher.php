<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        return $query;
    }
}
