<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ProdepHelp extends Model
{
    use HasFactory;
    protected $table = "apoyos_prodep";
    public $timestamps = false;


    protected $fillable = ["monto", "tipo", "fecha", "nempleado"];

    public function employee()
    {
        return $this->belongsTo(Employee::class, "nempleado");
    }

    /*public function setTypeAttribute($value) {
      if (is_int($value)) {
        $this->attributes["type"] = $value;
      }
    }*/

    public function getTypeNameAttribute() {
      switch($this->tipo) {
        case 0: return "Apoyo inicial";
        case 1: return "Apoyo complementario";
        case 2: return "Apoyo 6 años";
        case 3: return "Estancias cortas";
        case 4: return "Apoyo publicación";
      }
    }

    public function scopeCloseToRetirement($query) {
      return $query
        ->joinSub(function($query){
          $query
            ->select("*")
            ->fromSub(function($query){
              $query
                ->select("apoyos_prodep.*", "empleados.f_nacimiento as fecha_nacimiento")
                ->from("apoyos_prodep")
                ->join("empleados", function($join) {
                  $join->on("apoyos_prodep.nempleado","=","empleados.nempleado");
                })
                ->whereRaw("TO_DATE(f_nacimiento, 'DD/MM/YYYY') < NOW() + '-69.5years'");
            }, "inner_terms");
        }, "retirement", function($join) {
          $join->on("apoyos_prodep.id", "=", "retirement.id");
        })
        ->select("apoyos_prodep.*");
    }

    public function scopeGender($query, $gender) {
      if ($gender == "Hombre") {
        $gender = Employee::Male;
      } else if ($gender == "Mujer"){
        $gender = Employee::Female;
      }

      return $query
        ->joinSub(function($query) use ($gender) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($gender) {
              $query
                ->select("apoyos_prodep.*", "empleados.sexo as sexo")
                ->from("apoyos_prodep")
                ->join("empleados", function($join) {
                  $join->on("apoyos_prodep.nempleado","=","empleados.nempleado");
                })
                ->where("sexo", "ILIKE", $gender);
            }, "inner_terms");
        }, "gender", function($join) {
          $join->on("apoyos_prodep.id", "=", "gender.id");
        })
        ->select("apoyos_prodep.*");
    }

    public function scopeCampus($query, $name) {
      return $query
        ->joinSub(function($query) use ($name) {
          $query
            ->select("*")
            ->fromSub(function($query) use ($name) {
              $query
                ->select("apoyos_prodep.*", "unidades.unidad as unidad")
                ->from("apoyos_prodep")
                ->join("empleados", function($join) {
                  $join->on("apoyos_prodep.nempleado","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                })
                ->where("campus", "ILIKE", $name);
              }, "inner_terms");
        }, "campus", function($join) {
          $join->on("apoyos_prodep.id", "=", "campus.id");
        })
        ->select("apoyos_prodep.*");
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', nombre, apaterno, amaterno, nempleado, unidad, fecha, type_name)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query
        ->joinSub(function($query) use ($where) {
          $query
            ->select("*")
            ->fromSub(function($query) {
              $query
                ->select(
                    "apoyos_prodep.*",
                    "type_case.type_name",
                    "unidades.unidad",
                    "empleados.nombre",
                    "empleados.apaterno",
                    "empleados.amaterno"
                  )
                ->from("apoyos_prodep")
                ->joinSub(function($query) {
                  $query
                    ->selectRaw(
                      "id,
                       CASE tipo
                       WHEN '0' THEN 'Apoyo inicial'
                       WHEN '1' THEN 'Apoyo complementario'
                       WHEN '2' THEN 'Apoyo 6 años'
                       WHEN '3' THEN 'Estancias Cortas'
                       WHEN '4' THEN 'Apoyo publicación'
                       END AS type_name"
                     )
                    ->from("apoyos_prodep");
                }, "type_case", function($join) {
                  $join->on("apoyos_prodep.id","=","type_case.id");
                })
                ->join("empleados", function($join) {
                  $join->on("apoyos_prodep.nempleado","=","empleados.nempleado");
                })
                ->join("unidades", function($join) {
                  $join->on("empleados.nunidad","=","unidades.nunidad");
                });
            }, "inner_terms")
            ->where(function ($query) use ($where) {
              $query->orWhere($where);
            });
        }, "terms", function ($join){
          $join->on("apoyos_prodep.id", "=", "terms.id");
        })
        ->select("apoyos_prodep.*");
    }
}
