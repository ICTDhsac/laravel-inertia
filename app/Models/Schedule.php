<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    protected function timeIn(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => date('h:i A',strtotime($value)),
        );
    }

    protected function timeOut(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => date('h:i A',strtotime($value)),
        );
    }
}
