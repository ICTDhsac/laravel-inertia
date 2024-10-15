<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'flash' => [
                'response' => fn () => $request->session()->get('response')
            ],
            'domain' => url('/'),
            'asset' => url('/storage'),
            'auth' => [
                'user' => $this->getAuthUser() ?? [],
                'status' => Auth::check()
            ],
        ]);
    }

    public function getAuthUser()
    {
        return User::with([
            'position:id,name',
            'employmentStatus:id,name',
            'schedule:id,name',
            'department:id,name,office_id',
            'department.office:id,name,location_id',
            'department.office.location:id,name',
            'schedule:id,name',
        ])->find(Auth::id());

    }
}
