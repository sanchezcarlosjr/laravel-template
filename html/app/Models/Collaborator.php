<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaborator extends Model
{
    public $timestamps = false;
    protected $table = "colaboradores";
    protected $fillable = [
        'cuerpo_academico_id',
        'nempleado'
    ];
    use HasFactory;

    public function academicBody() {
      return $this->belongsTo(AcademicBody::class, "cuerpo_academico_id", "id");
    }

    public function employee() {
      return $this->belongsTo(Employee::class, "nempleado", "nempleado");
    }
}
