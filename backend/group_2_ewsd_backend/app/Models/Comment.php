<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['content', 'commented_time', 'contribution_id', 'user_id'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function contribution()
    {
        return $this->hasOne(Contribution::class, 'id', 'contribution_id');
    }
}
