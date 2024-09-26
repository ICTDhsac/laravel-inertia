<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\Hash;

class RoleUser extends Pivot
{
    protected $table = 'role_user';
    protected $fillable = ['user_id', 'role_id', 'password'];
    
        // Mutator for hashing password before saving
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
