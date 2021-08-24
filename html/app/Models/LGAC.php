<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

class LGAC extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'lgac_cuerpos_academicos';
    protected $fillable = [
        'nombre',
        'descripcion',
        'cuerpo_academico_id',
    ];

    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'cuerpo_academico_id');
    }

    public function employees(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class,
          'miembros_cuerpos_academicos',
          'lgac_cuerpos_academicos_id',
          'nempleado'
        )->whereNull('miembros_cuerpos_academicos.deleted_at')->withTimestamps();
    }

    public function scopeAcademicBody($query, $id) {
      return $query->where("cuerpo_academico_id", "=", $id);
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(nombre, descripcion, cuerpo_academico, prodep_area, nombre_de_empleado, apellido_paterno_de_empleado, apellido_materno_de_empleado, unidad)"), "ILIKE", "%".$terms[$i]."%");
      }
/*
      return $query->where(function ($query) use ($where) {
        $query->orWhere($where);
      });*/

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                  "lgac_cuerpos_academicos.*",
                  "cuerpos_academicos.nombre as cuerpo_academico",
                  "areas_prodep.nombre as prodep_area",
                  "empleados.nombre as nombre_de_empleado",
                  "empleados.apaterno as apellido_paterno_de_empleado",
                  "empleados.amaterno as apellido_materno_de_empleado",
                  "unidades.unidad"
                )
                ->from("lgac_cuerpos_academicos")
                ->join("cuerpos_academicos", "lgac_cuerpos_academicos.cuerpo_academico_id", "cuerpos_academicos.id")
                ->join("areas_prodep", "cuerpos_academicos.area_prodep_id", "areas_prodep.id")
                ->join("empleados", "cuerpos_academicos.nempleado_lider", "empleados.nempleado")
                ->join("unidades", "empleados.nunidad", "unidades.nunidad");
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->where($where);
            });
        }, "terms", function ($join) {
          $join->on("lgac_cuerpos_academicos.id", "=", "terms.id");
        })
        ->select("lgac_cuerpos_academicos.*");
    }
}
