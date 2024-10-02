<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'time_in',
        'time_out',
        'break_out',
        'break_in',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
