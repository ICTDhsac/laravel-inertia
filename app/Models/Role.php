<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'created_by',
        'modified_by',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user')->withPivot('password');
    }
}
