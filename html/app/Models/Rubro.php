<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;

class Rubro extends Model
{
    use HasFactory;
    protected $table = 'prodep_rubros';
    protected $fillable = [
        'monto',
        'autorizado',
        'nombre',
        'rubreable_id',
        'rubreable_tipo'
    ];

    public function rubrable(): MorphTo {
      return $this->morphTo();
    }
}
