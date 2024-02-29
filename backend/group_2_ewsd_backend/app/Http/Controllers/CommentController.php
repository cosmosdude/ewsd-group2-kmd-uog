<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Contribution;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{ 
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'contribution_id' => 'required',
        ]);
        $contribution =  Contribution::findOrFail($request->contribution_id);
        $student_faculty_id = $this->getFacultyId($contribution->user_id);
        $auth_user_faculty_id = $this->getFacultyId(Auth::user()->id);
        if ($student_faculty_id != $auth_user_faculty_id) {
            return $this->sendError('You don\'t have permission to comment this contribution', 403);
        }
        $comment = Comment::create([
            'content' => $request->content,
            'commented_time' => Carbon::now(),
            'contribution_id' => $request->contribution_id,
            'user_id' => Auth::user()->id,
        ]);
        if (Auth::user()->hasRole('m_coordinator')) {
            $contribution->update([
                'is_commented' => 1
            ]);
        }
        return $this->sendResponse($comment, "Successfully Commented to Contributions", 200);
    }
    private function getFacultyId($user_id)
    {
        $faculty_id = DB::table('contributions')
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('users.id', $user_id)
            ->first(['faculty_users.faculty_id']);
        return $faculty_id;
    }
}
