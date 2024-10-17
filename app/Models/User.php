<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
// use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;

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
        'position_id',
        'department_id',
        'employment_status_id',
        'schedule_id',
        'employee_id',
        'last_name',
        'first_name',
        'middle_name',
        'suffix',
        'contact',
        'email',
        'gender',
        'date_hired',
        'user_photo',
    ];

    protected $appends = ['full_name'];

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

    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    /* Relations to Department class */
    public function department()
    {
        return $this->belongsTo(Department::class); //default foreign if not specified modelname_id
    }

    public function departmentHead()
    {
        return $this->hasMany(Department::class, 'department_head_id'); //default foreign if not specified modelname_id
    }

    public function createdDepartments()
    {
        return $this->hasMany(Department::class, 'created_by');
    }

    public function modifiedDepartments()
    {
        return $this->hasMany(Department::class, 'modified_by');
    }
    /* end */

    public function employmentStatus()
    {
        return $this->belongsTo(EmploymentStatus::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    /* Relations to Role */
    public function roles()
    {
        
        return $this->belongsToMany(Role::class)->using(RoleUser::class)->withPivot(['username', 'password'])->withTimestamps();
        
        // return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id')
        //             ->as('user_role')
        //             ->withPivot('password')
        //             ->withTimestamps();
                    
    }

    public function createdRoles()
    {
        return $this->hasMany(Role::class, 'created_by');
    }

    public function modifiedRoles()
    {
        return $this->hasMany(Role::class, 'modified_by');
    }

    /* end */

    /* Relations to Plan */
    // public function plans()
    // {
    //     return $this->belongsToMany(Plan::class, 'plan_member')
    //                             ->withPivot('is_division_user')
    //                             ->withTimestamps();
    // }
    public function plans()
    {
        return $this->belongsToMany(Plan::class, 'plan_user')->withTimestamps();
    }

    public function createdPlans()
    {
        return $this->hasMany(Plan::class, 'created_by');
    }

    public function modifiedPlans()
    {
        return $this->hasMany(Plan::class, 'modified_by');
    }
    /* end */

    /* Relations to Office */
    public function serviceHead()
    {
        return $this->hasMany(Office::class, 'service_head_id');
    }
    public function commissioner()
    {
        return $this->hasMany(Office::class, 'commissioner_id'); 
    }
    /* end */
    
    public function hr(){
        return $this->hasMany(Office::class, 'hr_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function modifier()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }


    public function getFullNameAttribute()
    {
        return $this->last_name . ', ' . $this->first_name . ' ' . ($this->middle_name ?? '');
    }



}
