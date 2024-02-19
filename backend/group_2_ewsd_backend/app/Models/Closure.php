<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Closure extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'start_date', 'closure_date', 'final_closure_date', 'academic_id'];
    public function academicYear()
    {
        return $this->hasOne(AcademicYear::class, 'id', 'academic_year_id');
    }
    public function contributions()
    {
        return $this->hasMany(Contribution::class, 'closure_id', 'id');
    }
}
