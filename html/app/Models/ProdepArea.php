<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProdepArea extends Model
{
    use HasFactory;
    protected $table = "areas_prodep";

    public function scopeName($query, $value) {
      return $query->where("nombre", "ILIKE", "%".$value."%");
    }

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(ProdepDiscipline::class, 'disciplina_prodep_id');
    }
}
