<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;


class LoginController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    // Handle login request
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $roleUser = DB::table('role_user')->where('username', $credentials['username'])->first();

        if (!$roleUser) {
            return back()->withErrors(['username' => 'The provided username is incorrect.']);
        }

        if (!Hash::check($credentials['password'], $roleUser->password)) {
            return back()->withErrors(['password' => 'The provided password is incorrect.']);
        }

        $user = User::find($roleUser->user_id);

        if ($user) {
            Auth::login($user);
            // Regenerate the session to prevent session fixation attacks
            $request->session()->regenerate();
    
            return redirect()->intended('/users');
        }

        return back()->withErrors(['login' => 'Unable to log in.']);

    }

    // Handle logout request
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }


}
