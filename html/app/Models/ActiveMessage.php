<?php


namespace App\Models;


trait ActiveMessage
{
    public function getActiveAttribute($value)
    {
        return $value ? "VIGENTE" : "SIN VIGENCIA";
    }
}
