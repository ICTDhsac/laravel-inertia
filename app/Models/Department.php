<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'office_id',
        'department_head_id',
        'created_by',
        'modified_by'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function plans()
    {
        return $this->belongsToMany(Plan::class, 'plan_department')->withTimestamps();
    }

    public function office()
    {
        return $this->belongsTo(Office::class, 'office_id');
    }

    public function departmentHead()
    {
        return $this->belongsTo(User::class, 'department_head_id');
    }
    
}
