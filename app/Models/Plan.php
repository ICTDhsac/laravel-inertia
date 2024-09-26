<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'created_by',
        'modified_by',
        'privacy',
    ];

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
