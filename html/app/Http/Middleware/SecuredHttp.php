<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecuredHttp
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return !$request->secure() && App::environment('production') ?
            redirect()->secure($request->getRequestUri(), 301) :
            $next($request);
    }
}
