<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AcademicBody extends Model
{
    use HasFactory;
    protected $table = 'cuerpos_academicos';
    protected $fillable = [
        'nombre',
        'clave_prodep',
        'vigente',
        'area_prodep_id',
        'nempleado_lider',
        'disciplina',
        'des_id'
    ];
    protected $appends = [
        "grade",
        "employees",
        "last_evaluation"
    ];

    public function des()
    {
        return $this->belongsTo(DES::class, "des_id");
    }

    public function lgacs()
    {
        return $this->hasMany(LGAC::class, 'cuerpo_academico_id');
    }

    public function networks()
    {
        return $this->hasMany(Network::class, 'cuerpo_academico_id');
    }

    public function helps()
    {
        return $this->hasMany(Help::class, 'cuerpo_academico_id');
    }

    public function evaluations(): HasMany
    {
        return $this->hasMany(Evaluation::class, 'cuerpo_academico_id')->orderBy('fecha_fin', 'desc');
    }

    public function prodep_area()
    {
        return $this->belongsTo(ProdepArea::class, 'area_prodep_id');
    }

    public function leader()
    {
        return $this->belongsTo(Employee::class, "nempleado_lider", "nempleado");
    }

    public function collaborators(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'colaboradores', 'cuerpo_academico_id', 'nempleado');
    }

    public function getGradeAttribute()
    {
        if ($this->evaluations->count() == 0) {
            return null;
        }
        return $this->evaluations->get(0)->grade_name;
    }

    public function getEmployeesAttribute()
    {
        $lgacs = $this->lgacs;
        $employees = new Collection();
        foreach ($lgacs as $lgac) {
            $employees = $employees->merge($lgac->employees);
        }
        return $employees->unique('nempleado');
    }

    public function getLastEvaluationAttribute()
    {
        return $this->evaluations->sortBy('fecha_fin')->get(0);
    }

    public function scopeGrade($query, $grade_names)
    {
        $grades = [];
        if (in_array("En formación", $grade_names)) {
            $grades[] = 0;
        }
        if (in_array("En consolidación", $grade_names)) {
            $grades[] = 1;
        }
        if (in_array("Consolidado", $grade_names)) {
            $grades[] = 2;
        }
        return $query
            ->joinSub(function ($query) use ($grades) {
                $query
                    ->select("*")
                    ->fromSub(function ($query) {
                        $query
                            ->select("*")
                            ->from("cuerpos_academicos")
                            ->joinSub(function ($query) {
                                /** Distinct on Laravel's QueryBuilder doesn't accept parameters */
                                $query->selectRaw("DISTINCT ON (cuerpo_academico_id) cuerpo_academico_id, grado FROM evaluaciones_cuerpos_academicos ORDER BY cuerpo_academico_id, fecha_fin DESC");
                            }, "max_grades", function ($join) {
                                $join->on("cuerpos_academicos.id", "=", "max_grades.cuerpo_academico_id");
                            });
                    }, "inner_terms")
                    ->where(function ($query) use ($grades) {
                        for ($i = 0; $i < count($grades); $i++) {
                            $query->orWhere("grado", "=", $grades[$i]);
                        }
                    });
            }, "grade", function ($join) {
                $join->on("cuerpos_academicos.id", "=", "grade.id");
            })
            ->select("cuerpos_academicos.*");
    }

    public function scopeCampus($query, $name)
    {
        return $query
            ->joinSub(function ($query) use ($name) {
                $query
                    ->select("*")
                    ->fromSub(function ($query) use ($name) {
                        $query
                            ->select("cuerpos_academicos.*", "unidades.unidad as unidad")
                            ->from("cuerpos_academicos")
                            ->leftJoin("empleados", function ($join) {
                                $join->on("cuerpos_academicos.nempleado_lider", "=", "empleados.nempleado");
                            })
                            ->leftJoin("unidades", function ($join) {
                                $join->on("empleados.nunidad", "=", "unidades.nunidad");
                            })
                            ->where("campus", "ILIKE", $name);
                    }, "inner_terms");
            }, "campus", function ($join) {
                $join->on("cuerpos_academicos.id", "=", "campus.id");
            })
            ->select("cuerpos_academicos.*");
    }

    public function scopeValidity($query, $value)
    {
        if ($value == "Vigente") {
            return $query->where("cuerpos_academicos.vigente", "=", "t");
        } else if ($value == "No vigente") {
            return $query->where("cuerpos_academicos.vigente", "=", "f");
        }
    }

    public function scopeTerms($query, $terms)
    {
        if (empty($terms)) {
            return $query;
        }

        $where = [];
        for ($i = 0; $i < count($terms); $i++) {
            $where[] = array(DB::raw("CONCAT_WS(' ', nombre, grado, prodep_clave, unidad)"), "ILIKE", "%" . $terms[$i] . "%");
        }

        return $query
            ->joinSub(function ($query) use ($where) {
                $query
                    ->select("*")
                    ->fromSub(function ($query) {
                        $query
                            ->select(
                                "cuerpos_academicos.*",
                                "cuerpos_academicos.clave_prodep as prodep_clave",
                                "evaluaciones_cuerpos_academicos.grado as grado",
                                "unidades.unidad")
                            ->from("cuerpos_academicos")
                            ->leftJoin("evaluaciones_cuerpos_academicos", function ($join) {
                                $join->on("cuerpos_academicos.id", "=", "evaluaciones_cuerpos_academicos.cuerpo_academico_id");
                            })
                            ->leftJoin("empleados", function ($join) {
                                $join->on("cuerpos_academicos.nempleado_lider", "=", "empleados.nempleado");
                            })
                            ->leftJoin("unidades", function ($join) {
                                $join->on("empleados.nunidad", "=", "unidades.nunidad");
                            });
                    }, "inner_terms")
                    ->where(function ($query) use ($where) {
                        $query->orWhere($where);
                    });
            }, "terms", function ($join) {
                $join->on("cuerpos_academicos.id", "=", "terms.id");
            })
            ->select("cuerpos_academicos.*")
            ->distinct();
    }
}
