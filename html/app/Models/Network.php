<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Network extends Model
{
    protected $table = "redes_cuerpos_academicos";
    use HasFactory;
    protected $fillable = [
        'nombre',
        "id",
        'tipo',
        'clase',
        'cuerpos_academico_id',
        'rango',
        'fecha_inicio',
        'url_convenio',
        'fecha_fin',
        'lider_de_red_id'
    ];
    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'cuerpos_academico_id');
    }
    public function leader()
    {
        return $this->hasOne(CollaboratorNetwork::class, "id", "lider_de_red_id");
    }
    public function collaborators()
    {
        return $this->hasMany(CollaboratorNetwork::class, "cuerpos_academico_id");
    }
    public function scopeTerms($query, $terms) {
        if (empty($terms)) {
          return $query;
        }
        return $query;
    }
}
