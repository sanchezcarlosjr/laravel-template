<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProdepNPTC extends Model
{
    use HasFactory;
    protected $fillable = [
      "fecha_inicio",
      "nempleado",
      "extension",
      "autorizado"
    ];
    protected $table = "nptc_prodep";

    public function employee()
    {
        return $this->belongsTo(Employee::class, "nempleado");
    }

    public function rubros(): MorphMany {
      return $this->morphMany(Rubro::class, "rubreable");
    }

    /** Megarubros */

    public function rubro1(): MorphMany {
      return $this->morphMany(Rubro::class, "rubreable");
    }

    public function rubro2(): MorphMany {
      return $this->morphMany(Rubro::class, "rubreable");
    }

    public function rubro3(): MorphMany {
      return $this->morphMany(Rubro::class, "rubreable");
    }

    public function getAmountAttribute()
    {
        return number_format($this->rubros->reduce(function($carry, $rubro) {
          return $carry + $rubro->amount;
        }, 0), 2, ".", "");
    }

    public function getFinishDateAttribute()
    {
      return Carbon::parse($this->fecha_inicio)->addMonths($this->extension?18:12);
    }

    public function scopeautorizado($query, $value) {
      if ($value == "Autorizado") {
        $value = true;
      } else if ($value == "No autorizado") {
        $value = false;
      } else {
        $value = null;
      }
      return $query->where("autorizado", $value);
    }

    public function scopeExtended($query, $value) {
      if ($value == "Con prórroga") {
        $value = true;
      } else { //bruh just $value = $value ==
        $value = false;
      }
      return $query->where("extension", $value);
    }

    public function scopeCampus($query, $campus) {
      return $query
          ->joinSub(DB::table("empleados")
            ->select("empleados.*")
            ->join("unidades", "empleados.nunidad", "=", "unidades.nunidad")
            ->where("campus", "ILIKE", $campus), "campus", function($join) {
              $join->on("nptc_prodep.nempleado", "=", "campus.nempleado");
            });
    }

    public function scopeTerms($query, $terms) {
      if (empty($terms)) {
        return $query;
      }

      $where = [];
      for ($i = 0; $i < count($terms); $i++) {
        $where[] = array(DB::raw("CONCAT_WS(' ', nombre, apaterno, amaterno, nempleado, unidad, fecha_inicio, area_prodep)"), "ILIKE", "%".$terms[$i]."%");
      }

      return $query;
    }
}
