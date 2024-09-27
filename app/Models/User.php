<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // protected $keyType = 'string';
    // public $incrementing = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_no',
        'department_id',
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'contact_no',
        'gender',
        'date_hired',
        'user_photo',
        'email_verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }


    // Relationships
    public function roles()
    {
        
        return $this->belongsToMany(Role::class)->using(RoleUser::class)->withPivot('password')->withTimestamps();
        
        // return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id')
        //             ->as('user_role')
        //             ->withPivot('password')
        //             ->withTimestamps();
                    
    }

    public function department()
    {
        return $this->belongsTo(Department::class); //default foreign if not specified modelname_id
    }

    public function departmentHead()
    {
        return $this->hasMany(Department::class, 'department_head_id'); //default foreign if not specified modelname_id
    }
    public function createdPlans()
    {
        return $this->hasMany(Plan::class, 'created_by');
    }

    public function modifiedPlans()
    {
        return $this->hasMany(Plan::class, 'modified_by');
    }

    public function createdDepartments()
    {
        return $this->hasMany(Department::class, 'created_by');
    }

    public function modifiedDepartments()
    {
        return $this->hasMany(Department::class, 'modified_by');
    }
}
