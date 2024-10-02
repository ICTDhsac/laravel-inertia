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
        return $this->belongsToMany(User::class)->using(RoleUser::class)->withPivot('password')->withTimestamps();
        // return $this->belongsToMany(User::class, 'role_user', 'role_id', 'user_id')
        //             ->as('user_role')
        //             ->withPivot('password')
        //             ->withTimestamps();
    }

    
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Relationship to the User model for the modifier
    public function modifier()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }
}
