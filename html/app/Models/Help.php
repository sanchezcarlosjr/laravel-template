<?php

    namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Help extends Model
{
    protected $table = "apoyos_cuerpos_academicos";
    public $timestamps = false;
    protected $fillable = [
        'monto',
        'tipo',
        'fecha',
        'reporte_url',
        'liberacion_url',
        'cuerpo_academico_id',
        'nempleado_beneficiado'
    ];
    use HasFactory;

    public function getTypeNameAttribute()
    {
        switch ($this->tipo) {
            case 0:
                return "Estancias Cortas";
            case 1:
                return "Apoyo a publicación";
            case 2:
                return "Convocatoria Redes";
            case 3:
                return "Convocatoria fortalecimiento de CA";
            case 4:
                return "Becas postdoctorado";
        }
    }

    public function benefited_employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'nempleado_beneficiado');
    }

    public function academic_body(): BelongsTo
    {
        return $this->belongsTo(AcademicBody::class, 'cuerpo_academico_id');
    }

    public function scopeAcademicBody($query, $id)
    {
        return $query->where("apoyos_cuerpos_academicos.cuerpo_academico_id", "=", $id);
    }

    public function generateURL(): string
    {
        return "public/archivos/cuerpos-academicos/" . $this->cuerpo_academico_id . "/apoyos/" . $this->id . "/" . Str::random(40);
    }

    public function scopeTerms($query, $terms)
    {
        if (empty($terms)) {
            return $query;
        }

        $where = [];
        for ($i = 0; $i < count($terms); $i++) {
            $where[] = array(DB::raw("CONCAT_WS(' ', type_name, fecha, nombre, apaterno, amaterno, unidad, campus, academic_body)"), "ILIKE", "%" . $terms[$i] . "%");
        }

        return $query
            ->joinSub(function ($query) use ($where) {
                $query
                    ->select("*")
                    ->fromSub(function ($query) {
                        $query
                            ->select(
                                "apoyos_cuerpos_academicos.*",
                                "cuerpos_academicos.nombre as academic_body",
                                "empleados.nombre",
                                "empleados.apaterno",
                                "empleados.amaterno",
                                "unidades.unidad",
                                "unidades.campus"
                            )
                            ->from("apoyos_cuerpos_academicos")
                            ->joinSub(function ($query) {
                                $query
                                    ->selectRaw(
                                        "id,
                       CASE tipo
                       WHEN '0' THEN 'Estancias Cortas'
                       WHEN '1' THEN 'Apoyo a publicación'
                       WHEN '2' THEN 'Convocatoria Redes'
                       WHEN '3' THEN 'Convocatoria fortalecimiento de CA'
                       WHEN '4' THEN 'Becas postdoctorado'
                       END AS type_name"
                                    )
                                    ->from("apoyos_cuerpos_academicos");
                            }, "type_case", function ($join) {
                                $join->on("apoyos_cuerpos_academicos.id", "=", "type_case.id");
                            })
                            ->join("cuerpos_academicos", "apoyos_cuerpos_academicos.cuerpo_academico_id", "cuerpos_academicos.id")
                            ->join("empleados", "apoyos_cuerpos_academicos.nempleado_beneficiado", "empleados.nempleado")
                            ->join("unidades", "empleados.nunidad", "unidades.nunidad");
                    }, "inner_terms")
                    ->where(function ($query) use ($where) {
                        $query->where($where);
                    });
            }, "terms", function ($join) {
                $join->on("apoyos_cuerpos_academicos.id", "=", "terms.id");
            })
            ->select("apoyos_cuerpos_academicos.*");
    }
}
