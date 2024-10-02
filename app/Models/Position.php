<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Position extends Model
{
    use HasFactory;

    protected $fillable = [
        'sg_id',
        'name',
        'status',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
