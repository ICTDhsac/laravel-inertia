<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Http\Requests\StorePositionRequest;
use App\Http\Requests\UpdatePositionRequest;

class PositionController extends Controller
{
    protected $title = "Positions";
    protected $navigationLinks = [
        [
            'link' => '#',
            'icon' => 'DatabaseZap',
            'label' => 'Master Data'
        ],
        [
            'link' => '#',
            'icon' => 'UserCircle',
            'label' => 'Positions'
        ]
    ];

    public function index()
    {
        $positions = Position::withCount('users')
                    ->with('users')
                    ->get();
        $navigationLinks = $this->navigationLinks;
        // dd($positions->toArray());
        return inertia('HRMIS/Positions/Index', compact('positions', 'navigationLinks'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePositionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Position $position)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePositionRequest $request, Position $position)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Position $position)
    {
        //
    }

    public function getTitle()
    {
        return $this->title;
    }
}
