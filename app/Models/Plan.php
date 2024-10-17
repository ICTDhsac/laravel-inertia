<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'privacy',
        'is_group_plan',
        'created_by',
        'modified_by',
    ];

    // public function users()
    // {
    //     return $this->belongsToMany(User::class, 'plan_member')
    //                             ->withPivot('is_division_user')
    //                             ->withTimestamps();
    // }
    public function users()
    {
        return $this->belongsToMany(User::class, 'plan_user')->withTimestamps();
    }

    public function departments()
    {
        return $this->belongsToMany(Department::class, 'plan_department')->withTimestamps();
    }
    // Relationship to the User model for the creator
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
