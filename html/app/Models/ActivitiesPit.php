<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivitiesPit extends Model
{
    use HasFactory;

    protected $fillable = ["kind_of_applicant", "name_event", "asistence", "goal", "date", "academic_unit_id"];

    public function academic_unit()
    {
        return $this->belongsTo(AcademicUnit::class, "academic_unit_id");
    }
}
