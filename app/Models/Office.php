<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Office extends Model
{
    use HasFactory;


    protected $fillable = [
        'service_head_id',
        'commissioner_id',
        'location_id',
        'name',
    ];

    public function departments()
    {
        return $this->hasMany(Department::class);
    }

    // Define the relationship to the Service Head
    public function serviceHead()
    {
        return $this->belongsTo(User::class, 'service_head_id');
    }

    // Define the relationship to the Commissioner
    public function commissioner()
    {
        return $this->belongsTo(User::class, 'commissioner_id');
    }

    // Define the relationship to the Location (assuming it's also a User or change to the correct model)
    public function location()
    {
        return $this->belongsTo(Location::class, 'location_id');
    }
}
