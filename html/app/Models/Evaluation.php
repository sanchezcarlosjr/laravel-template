<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class Evaluation extends Model
{
    protected $table = 'evaluaciones_cuerpos_academicos';
    protected $fillable = [
      'grado',
      'fecha_inicio',
      'years_to_finish',
      'cuerpo_academico_id'
    ];
    use HasFactory;

    public function academic_bodies(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'cuerpo_academico_id');
    }

    public function getYearsToFinishAttribute()
    {
        return Carbon::parse($this->fecha_fin)->diffInYears(Carbon::parse($this->fecha_inicio));
    }

    public function setYearsToFinishAttribute($years) {
      $this->attributes["fecha_fin"] = Carbon::parse($this->fecha_inicio)->addYears($years);
    }

    public function getGradeNameAttribute() {
      switch($this->grado) {
        case 0: return "En formación";
        case 1: return "En consolidación";
        case 2: return "Consolidado";
      }
    }

    public function scopeAcademicBody($query, $id) {
      return $query->whereHas("academic_bodies", function($query) use ($id) {
        $query->where("cuerpo_academico_id", "=", $id);
      });
    }

    /* bruh
    public function scopeCampus($query, $campus) {
      return $query
        ->joinSub(function($query) use ($campus) {
          $query
            ->select("academic_bodies_evaluations.*")
            ->from("academic_bodies_evaluations")
            ->leftJoin("academic_bodies", "academic_bodies_evaluations.cuerpo_academico_id", "academic_bodies.id")
            ->leftJoin("empleados", "academic_bodies.lead_nempleado", "nempleado")
            ->leftJoin("unidades", "empleados.nunidad", "=", "unidades.nunidad")
            ->where("unidades.campus", "ILIKE", $campus);
        }, "campus", function($join) {
          $join->on("academic_bodies_evaluations.id", "=", "campus.id");
        })
        ->select("academic_bodies_evaluations.*");
    }*/

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', fecha_inicio, fecha_fin, type_name)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                    "evaluaciones_cuerpos_academicos.*",
                    "type_case.type_name"
                  )
                ->from("evaluaciones_cuerpos_academicos")
                ->joinSub(function($query) {
                  $query
                    ->selectRaw(
                      "id,
                       CASE grado
                       WHEN '0' THEN 'En formación'
                       WHEN '1' THEN 'En consolidación'
                       WHEN '2' THEN 'Consolidado'
                       END AS type_name"
                     )
                    ->from("evaluaciones_cuerpos_academicos");
                }, "type_case", function($join) {
                  $join->on("evaluaciones_cuerpos_academicos.id","=","type_case.id");
                });
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->where($where);
            });
        }, "terms", function ($join){
          $join->on("evaluaciones_cuerpos_academicos.id", "=", "terms.id");
        })
        ->select("evaluaciones_cuerpos_academicos.*");
    }

}
