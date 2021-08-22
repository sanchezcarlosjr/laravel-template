<?php

namespace App\GraphQL\Queries;


use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Nuwave\Lighthouse\Exceptions\ValidationException;

class Login
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args): User
    {
        $employee = Employee::where('correo1', $args['email'])->first();
        if (!$employee) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        $user = User::where('nempleado', '=', $employee->nempleado)->first();
        if (!$user || !Hash::check($args['password'], $user->contrasena)) {
            throw ValidationException::withMessages([
                'email' => ['The provided password are incorrect.'],
            ]);
        }
        $user->tokens()->delete();
        $user['current_access_token'] = $user->createToken('default')->plainTextToken;
        $role = $user->roles()->get()[0];
        $user['permissions'] = $role->permissions()->get()->map(function($permission) {
            return  [
                'module' => $permission->modulo,
                'create' => $permission->pivot->crear,
                'edit' => $permission->pivot->editar,
                'read' => $permission->pivot->leer,
                'destroy' => $permission->pivot->destruir
            ];
        });
        return $user;
    }
}
