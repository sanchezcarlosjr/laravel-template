<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UABCArea extends Model
{
    protected $primaryKey = 'narea';
    protected $table = 'areas_con';
    use HasFactory;
}
