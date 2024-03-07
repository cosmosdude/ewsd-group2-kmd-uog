<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Comment;
use App\Mail\CommentedEmail;
use App\Models\Contribution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\FacultyUser;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

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
        $auth_user_faculty_id = FacultyUser::where('user_id',Auth::user()->id)
        ->where('faculty_id',$student_faculty_id)
        ->first()
        ->faculty_id;
        // return response()->json($auth_user_faculty_id);
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

            //send email to student when m_coordinator commented
            $student = $contribution->user;
            Mail::to($student->email)->send(new CommentedEmail($student->name, $request->content, $contribution));
        } else {
            //send email to coordinator when student commented
            $coordinator = User::where('faculty_id', $student_faculty_id)
                ->where('role_id', 3)
                ->first();
            if ($coordinator) {
                //dd($coordinator);
                Mail::to($coordinator->email)->send(new CommentedEmail($coordinator->name, $request->content, $contribution));
            }
        }
        return $this->sendResponse($comment, "Successfully Commented to Contributions", 200);

    }
    private function getFacultyId($user_id)
    {

        $faculty_id = DB::table('contributions')
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('users.id', $user_id)
            ->first(['faculty_users.faculty_id'])
            ->faculty_id;
        return $faculty_id;
    }
}
