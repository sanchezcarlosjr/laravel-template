<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SNIArea extends Model
{
    protected $table = 'areas_sni';
    public $timestamps = false;
    protected $fillable = [
        "nombre"
    ];
    use HasFactory;
    public function scopeName($query, $value) {
        return $query->where("nombre", "ILIKE", "%".$value."%");
    }
}
