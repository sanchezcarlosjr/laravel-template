<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\Contracts\HasApiTokens as HasApiTokensContract;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements HasApiTokensContract
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "siiip_usuarios";
    protected $fillable = [
        'rol_id',
        'nempleado',
        "contrasena"
    ];
    protected $hidden = [
        "contrasena"
    ];

    public function roles()
    {
        return $this->belongsTo(Role::class, 'rol_id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'nempleado');
    }

    public function scopeCampus(Builder $query, string $campus): Builder
    {
        return $query->joinSub(Employee::campus($campus), 'employeeCampus', function ($join) {
            $join->on('siiip_usuarios.nempleado', '=', 'employeeCampus.nempleado');
        });
    }

    public function getRoleAttribute() {
        return $this->belongsTo(Role::class, 'rol_id')->get()->implode('rol', ',');
    }

    public function scopeGender(Builder $query, string $gender): Builder
    {
        return $query->joinSub(Employee::gender($gender), 'employeeGender', function ($join) {
            $join->on('siiip_usuarios.nempleado', '=', 'employeeGender.nempleado');
        });
    }

    public function scopeTerms(Builder $query, $terms): Builder
    {
        if (empty($terms)) {
            return $query;
        }
        return $query->joinSub(Employee::terms($terms), 'employee', function ($join) {
            $join->on('siiip_usuarios.nempleado', '=', 'employee.nempleado');
        });
    }

}
