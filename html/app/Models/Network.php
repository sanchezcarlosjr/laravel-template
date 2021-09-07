<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Network extends Model
{
    public $timestamps = false;
    use HasFactory;
    protected $table = "redes_cuerpos_academicos";
    protected $fillable = [
        'nombre',
        "id",
        'tipo',
        'clase',
        'cuerpo_academico_id',
        'rango',
        'fecha_inicio',
        'url_convenio',
        'fecha_fin',
        'lider_de_red_id'
    ];

    public function getTypeNameAttribute()
    {
        switch ($this->tipo) {
            case 0:
                return "Local";
            case 1:
                return "Regional";
            case 2:
                return "Nacional";
            case 3:
                return "Internacional";
        }
    }

    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'cuerpo_academico_id');
    }

    public function leader()
    {
        return $this->hasOne(CollaboratorNetwork::class, "id", "lider_de_red_id");
    }

    public function collaborators()
    {
        return $this->hasMany(CollaboratorNetwork::class, "cuerpos_academicos_redes_id");
    }

    public function scopeAcademicBody($query, $id)
    {
        return $query->where("cuerpo_academico_id", "=", $id);
    }

    public function scopeTerms($query, $terms)
    {
        if (empty($terms)) {
            return $query;
        }
        $where = [];
        for ($i = 0; $i < count($terms); $i++) {
            $where[] = array(DB::raw("CONCAT_WS(nombre, rango, tipo, clase)"), "ILIKE", "%" . $terms[$i] . "%");
        }
        return $query->where($where);
    }
}
