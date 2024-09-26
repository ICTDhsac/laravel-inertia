<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function departmentHead()
    {
        return $this->belongsTo(User::class, 'department_head_id');
    }
    
}
