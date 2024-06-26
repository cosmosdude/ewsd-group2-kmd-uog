<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

// use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role_id',
        'last_login_time',
        'view_count'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function hasRole($role)
    {
        return $this->role()->where('name', $role)->exists();
    }
    public function role()
    {
        return $this->hasOne(Role::class, "id", "role_id");
    }
    public function facultyUsers()
    {
        return $this->hasMany(FacultyUser::class, 'faculty_id', 'id');
    }
    public function academicHistories()
    {
        return $this->hasMany(AcademicHistory::class, "user_id", "id");
    }
    public function contributions()
    {
        return $this->hasMany(Contribution::class, "user_id", "id");
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, "user_id", "id");
    }
}
