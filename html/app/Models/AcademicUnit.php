<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicUnit extends Model
{
    protected $primaryKey = 'nunidad';
    protected $table = 'unidades';
    public $timestamps = false;
    use HasFactory;
}
