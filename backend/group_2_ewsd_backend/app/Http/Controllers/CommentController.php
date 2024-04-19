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

        $user = Auth::user();

        if (Auth::user()->hasRole('m_coordinator')) {
            $contribution->update([
                'is_commented' => 1
            ]);

            $student = DB::table('users')
                ->join('contributions', 'contributions.user_id', '=', 'users.id')
                ->where('contributions.user_id', '=', $contribution->user_id)
                ->select(['users.email as email', 'users.name as name'])
                ->first();

            $this->sendEmail(
                $student->name,
                $user->name,
                $contribution->name,
                $comment->content,
                $student->email
            );

            // Mail::to($student->email)
            //     ->send(new CommentedEmail($student->name, $request->content, $contribution));
        } else {
            $coordinator = DB::table('users')
                ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                ->where('faculty_users.faculty_id', $student_faculty_id)
                ->where('users.role_id', 3)
                ->select(['users.name as name', 'users.email as email'])
                ->first();

            $this->sendEmail(
                $coordinator->name,
                $user->name,
                $contribution->name,
                $comment->content,
                $coordinator->email
            );
            //send email to coordinator when student commented
            // $student_faculty_id = $this->getFacultyId($contribution->user_id);
            // $coordinator = User::where('faculty_id', $student_faculty_id)
            //     ->where('role_id', 3)
            //     ->first();
            // if ($coordinator) {
            //     //dd($coordinator);
            //     Mail::to($coordinator->email)->send(new CommentedEmail($coordinator->name, $request->content, $contribution));
            // }

            // $this->sendEmail(
            //     $student->name,
            //     $user->name,
            //     $contribution->name,
            //     $comment->content,
            //     $student->email
            // );
        }

        return $this->sendResponse($comment, "Successfully Commented to Contributions", 200);

    }

    private function sendEmail(
        $username, $commenter, $article, $comment,
        $toEmail    
    ) {
        /*
        <h1>New Comment</h1>
    <p>Dear {{ $username }},</p>
    <p>{{$commenter}} has made a comment on {{$article}}</p>
    <p><strong>Comment - </strong> {{ $comment }}</p>
    <p>Thank you,</p>
        */
        Mail::mailer('smtp')->send(
            'mail.comment', 
            [
                'username' => $username,
                'commenter' => $commenter,
                'article' => $article,
                'comment' => $comment
            ], 
            function($message) use ($toEmail) {
                $message->from(env('MAIL_USERNAME'));
                $message->to($toEmail);
                $message->subject('New comment');
        });
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
    // private function getStudentId($user_id)
    // {
    //     $student_id = DB::table('contributions')
    //         ->join('users', 'users.id', '=', 'contributions.user_id')
    //         ->where('users.id', $user_id)
    //         ->first(['users.email'])
    //         ->student_id;
    //     return $student_id;
    // }
}
