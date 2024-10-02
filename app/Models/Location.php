<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hr_user_id'
    ];

    public function hr_personnel(){
        return $this->belongsTo(User::class, 'hr_id');
    }
}
