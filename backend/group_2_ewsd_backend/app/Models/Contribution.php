<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'images',
        'files',
        'submitted_date',
        'attempt_number',
        'status',
        'is_commented',
        'closure_id',
        'user_id'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'contribution_id', 'id');
    }
    public function closure()
    {
        return $this->hasOne(Closure::class, 'id', 'closure_id');
    }
}
