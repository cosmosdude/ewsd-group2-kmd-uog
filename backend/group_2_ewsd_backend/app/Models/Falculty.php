<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Falculty extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'description',
        'room_no',
        'building_no',
    ];

    public function facultyUsers(){
        return $this->hasMany(FacultyUser::class, 'faculty_id', 'id');
    }
}
