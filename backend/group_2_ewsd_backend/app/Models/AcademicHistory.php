<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicHistory extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'academic_year_id','active_status'];
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function academicYear()
    {
        return $this->hasOne(AcademicYear::class, 'id', 'academic_year_id');
    }
}
