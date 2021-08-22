<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;


class ProdepProfile extends Model
{
    use HasFactory;
    use ActiveEmployee;
    protected $table = "prodep_perfiles";

    protected $fillable = [
      "fecha_inicio",
      "years_to_finish",
      "nempleado",
      "prodep_area_id"
    ];
    protected $appends = [
      "is_active"
    ];

    public function getIsActiveAttribute() {
      return Carbon::today()->lessThan($this->fecha_fin);
    }

    public function prodep_area()
    {
        return $this->belongsTo(ProdepArea::class, "prodep_area_id");
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, "nempleado");
    }

    public function getYearsToFinishAttribute() {
      if(isset($this->fecha_fin)) {
        return Carbon::parse($this->fecha_fin)->diffInYears(Carbon::parse($this->fecha_inicio));
      } else {
        return null;
      }
    }

    public function setYearsToFinishAttribute($years) {
      $this->attributes["fecha_fin"] = Carbon::parse($this->fecha_inicio)->addYears($years);
    }

    public function scopeMostRecent($query) {
      return $query->orderBy("fecha_inicio", "DESC");
    }

    public function scopeCampus($query, $name) {
      return $query
        ->joinSub(function($query) use ($name) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($name) {
              $query
                ->select("prodep_perfiles.*", "unidades.unidad as unidad")
                ->from("prodep_perfiles")
                ->join("empleados", function($join) {
                  $join->on("prodep_perfiles.nempleado","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                })
                ->where("campus", "ILIKE", $name);
              }, "inner_terms");
        }, "campus", function($join) {
          $join->on("prodep_perfiles.id", "=", "campus.id");
        })
        ->select("prodep_perfiles.*");
    }

    public function scopeCloseToRetirement($query) {
      return $query
        ->joinSub(function($query){
          $query
            ->select("*")
            ->fromSub(function($query){
              $query
                ->select("prodep_perfiles.*", "empleados.f_nacimiento as fecha_nacimiento")
                ->from("prodep_perfiles")
                ->join("empleados", function($join) {
                  $join->on("prodep_perfiles.nempleado","=","empleados.nempleado");
                })
                ->whereRaw("TO_DATE(f_nacimiento, 'DD/MM/YYYY') < NOW() + '-69.5years'");
            }, "inner_terms");
        }, "retirement", function($join) {
          $join->on("prodep_perfiles.id", "=", "retirement.id");
        })
        ->select("prodep_perfiles.*");
    }

    public function scopeGender($query, $gender) {
      if ($gender == "Hombre") {
        $gender = "Masculino";
      } else if ($gender == "Mujer"){
        $gender = "Femenino";
      }

      return $query
        ->joinSub(function($query) use ($gender) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($gender) {
              $query
                ->select("prodep_perfiles.*", "empleados.sexo as sexo")
                ->from("prodep_perfiles")
                ->join("empleados", function($join) {
                  $join->on("prodep_perfiles.nempleado","=","empleados.nempleado");
                })
                ->where("sexo", "ILIKE", $gender);
            }, "inner_terms");
        }, "gender", function($join) {
          $join->on("prodep_perfiles.id", "=", "gender.id");
        })
        ->select("prodep_perfiles.*");
    }

    public function scopeValidity($query, $value) {
      if ($value == "Vigente") {
        return $query->whereRaw("NOW() < prodep_perfiles.fecha_fin");
      } else if ($value == "No Vigente") {
        return $query->whereRaw("NOW() >= prodep_perfiles.fecha_fin");
      }
    }

    public function scopeName($query, $value) {
      return $query->where("prodep_perfiles.name", "ILIKE", "%".$value."%");
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', nombre, apaterno, amaterno, nempleado, unidad, fecha_inicio, fecha_fin, prodep_area)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                  "prodep_perfiles.*",
                  "areas_prodep.nombre as prodep_area",
                  "unidades.unidad",
                  "empleados.nombre",
                  "empleados.apaterno",
                  "empleados.amaterno")
                ->from("prodep_perfiles")
                ->join("areas_prodep", function($join) {
                  $join->on("prodep_perfiles.prodep_area_id","=","areas_prodep.id");
                })
                ->join("empleados", function($join) {
                  $join->on("prodep_perfiles.nempleado","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                });
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->orWhere($where);
            });
        }, "terms", function ($join) {
          $join->on("prodep_perfiles.id", "=", "terms.id");
        })
        ->select("prodep_perfiles.*");
    }
}
