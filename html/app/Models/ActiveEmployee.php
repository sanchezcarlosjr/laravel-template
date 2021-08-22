<?php


namespace App\Models;


use Carbon\Carbon;

trait ActiveEmployee
{
    public function scopeActive($query)
    {
        return $query->where('fecha_fin', ">", Carbon::now())->whereHas('employee', function ($q) {
            return $q->where('estatus', '==', '1');
        });
    }
}
