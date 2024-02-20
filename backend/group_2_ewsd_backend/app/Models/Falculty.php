<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Falculty extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->hasMany(User::class, 'falculty_id', 'id');
    }

    protected $fillable = [
        'name',
        'email',
        'phone',
        'description',
        'room_no',
        'building_no',
    ];
}
