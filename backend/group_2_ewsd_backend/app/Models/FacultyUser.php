<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FacultyUser extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'faculty_id'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function faculty()
    {
        return $this->hasOne(Falculty::class, 'id', 'faculty_id');
    }
}
