<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Researcher extends Model
{
    use HasFactory;
    protected $table = "profesores_investigadores";
    public $timestamps = false;

    protected $fillable = ["vigenteHasta", "probatorio", "nempleado"];

    public function employee()
    {
        return $this->belongsTo(Employee::class, "nempleado");
    }
}
