<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SessionTimeRemaining
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Session::put('last_activity', time());

        $sessionLifetime = config('session.lifetime'); // Lifetime in minutes
        $lastActivity = Session::get('last_activity', time()); // Default to now

        $remainingTime = $sessionLifetime - ((time() - $lastActivity) / 60);
        $remainingTime = max(0, round($remainingTime)); // Ensure non-negative value

        if ($remainingTime <= 0) {
            Auth::logout();
            Session::flush();
            return redirect()->route('login')->withErrors('Session expired. Please log in again.');
        }

        // Share the remaining session time with all Inertia responses
        Inertia::share('sessionTimeOut', $remainingTime);

        return $next($request);
    }
}
