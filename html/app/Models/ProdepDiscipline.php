<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdepArea extends Model
{
    use HasFactory;
    protected $table = "disciplinas_prodep";

    public function scopeName($query, $value) {
        return $query->where("nombre", "ILIKE", "%".$value."%");
    }

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(AreaProdep::class, 'disciplina_prodep_id');
    }
}
