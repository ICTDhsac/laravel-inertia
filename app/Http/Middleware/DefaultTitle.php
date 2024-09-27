<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class DefaultTitle
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $defaultTitle = 'Home';

        $route = $request->route();
        if ($route && method_exists($route, 'getController')) {
            $controller = $route->getController();
            
            // Use the getter method to access the title
            $title = method_exists($controller, 'getTitle') ? $controller->getTitle() : $defaultTitle;
        }

        // Share the title with all Inertia responses
        Inertia::share('title', $title);

        return $next($request);
    }
}
