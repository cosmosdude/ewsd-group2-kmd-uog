<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    use HasFactory;
    public function academic_histories()
    {
        return $this->hasMany(AcademicHistory::class, 'academic_year_id', 'id');
    }
    public function closures()
    {
        return $this->hasMany(Closure::class, 'academic_year_id', 'id');
    }
}
