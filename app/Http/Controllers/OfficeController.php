<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Office;
use Illuminate\Http\Request;

class OfficeController extends Controller
{

    protected $title = 'Offices';
    protected $navigationLinks = [
        [
            'link' => '#',
            'icon' => 'ShieldCheck',
            'label' => 'System Administration'
        ],
        [
            'link' => '#',
            'icon' => 'University',
            'label' => 'Offices'
        ]
    ];

    public function index()
    {
        $navigationLinks = $this->navigationLinks;
        $offices = Office::withCount('departments')
                    ->with([        
                        'location:id,name'
                    ])
                    ->get();
        $locations = Location::query()->select('id', 'name')->get();
        // dd($offices->toArray());
        return inertia('HRMIS/Offices/Index', compact('offices', 'locations', 'navigationLinks'));
    }

    public function getTitle()
    {
        return $this->title;
    }


}
