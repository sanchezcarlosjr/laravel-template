<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DES extends Model
{
    protected $primaryKey = 'cdes';
    public $timestamps = false;
    protected $table = 'des';
    use HasFactory;

    public function scopeNameLike($query, $value) {
      return $query->where("des", "ILIKE", "%".$value."%");
    }
}
