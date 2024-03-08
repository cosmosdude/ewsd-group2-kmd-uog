<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Closure;
use App\Models\Contribution;
use Illuminate\Http\Request;
use App\Mail\ArticleUploaded;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


class ContributionController extends Controller
{
    //need to fix this index function
    //the role attribute is not define and should be replace with function
    //need to add comment count in this function
    public function index()
    {
        // //display all contribution list and comment count
        // $commentscount = Contribution::select(
        //     'contributions.id',
        //     'contributions.name',
        //     'contributions.description',
        //     'contributions.images',
        //     'contributions.files',
        //     'contributions.submitted_date',
        //     'contributions.status',
        //     'contributions.closure_id',
        //     'contributions.user_id as student_id',
        //     DB::raw('count(comments.id) as commentcount')
        // )
        //     ->leftJoin('comments', 'contributions.id', '=', 'comments.contribution_id')
        //     ->groupBy(
        //         'contributions.id',
        //         'contributions.name',
        //         'contributions.description',
        //         'contributions.images',
        //         'contributions.files',
        //         'contributions.submitted_date',
        //         'contributions.status',
        //         'contributions.closure_id',
        //         'contributions.user_id'
        //     )
        //     ->get();

        // return response()->json(['Contribution List and Comment Count' => $commentscount], 200);

        
    }

    //view all uploaded contributions of each faculty before final closure


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'files' => 'required|mimes:doc,docx',
            'images' => 'nullable|max:5',
            // |mimes:jpg,jpeg,png
            'closure_id' => 'required|exists:closures,id',
            // 'user_id' => 'required|exists:users,id',
        ]);

        $request['user_id'] = Auth::user()->id;
        $closure = Closure::find($request->closure_id);
        if (Carbon::parse($closure->closure_date)->isPast()) {
            return $this->sendError('The closure is expired', 400);
        }
        if ($request->hasFile('files')) {
            $file = $request->file('files');
            if ($file->isValid()) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $fileName);
                $uploadedFiles[] = $fileName;
            }
        }
        $uploadedImages = [];
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            for ($i = 0; $i < count($images); $i++) {
                $image = $images[$i];
                if ($image->isValid()) {
                    $imageName = time() . '_' . $i . '.' . $image->getClientOriginalExtension();
                    $image->move(public_path('images'), $imageName);
                    $uploadedImages[] = $imageName;
                }
            }
        }


        $contributionData = [
            'name' => $request->name,
            'description' => $request->description,
            'files' => implode(',', $uploadedFiles),
            'submitted_date' => Carbon::now()->format('Y-m-d'),
            'attempt_number' => 1,
            'is_commented' => 0,
            'closure_id' => $request->closure_id,
            'user_id' => Auth::user()->id
        ];

        if (!empty($uploadedImages)) {

            $contributionData['images'] =  implode(',', $uploadedImages);
        }
        $contribution = Contribution::create($contributionData);
        return $this->sendResponse($contribution, "Contribution Created Successfully!", 201);
        //if student of faculty_id and coordinator of faculty_id are the same send email
        $user = auth()->user();
        if ($user->role_id === 4) {
            $coordinator = User::where('faculty_id', $user->faculty_id)
                ->where('role_id', 3)
                ->first();
        }
        if ($coordinator) {
            //if there has a problem display with dd first
            //dd($coordinator);
            Mail::to($coordinator->email)->send(new ArticleUploaded($coordinator->name, $user->name, $contribution));
        }


        // //send email noti
        // $coordinatorEmail = 'ewsdgroup2@yopmail.com';
        // $coordinatorName = 'Falculty Coordinator';
        // Mail::to('ewsdgroup2@yopmail.com')->send(new ArticleUploaded(auth()->user()->name, $request->name));


    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'files' => 'nullable|mimes:doc,docx',
            'closure_id' => 'required|exists:closures,id',
            // 'user_id' => 'required|exists:users,id',
        ]);

        $closure = Closure::find($request->closure_id);
        if (Carbon::parse($closure->final_closure_date)->isPast()) {
            return $this->sendError('The closure is expired', 400);
        }

        $contribution = Contribution::findOrFail($id);
        if (Auth::user()->id != $contribution->user_id) {
            return $this->sendError('You don\'t have permission to update this contribution', 403);
        }


        if ($request->hasFile('files')) {
            $file = $request->file('files');
            if ($file->isValid()) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('uploads'), $fileName);
                if ($contribution->files !== $fileName) {
                    if (file_exists(public_path('uploads/' . $contribution->files))) {
                        unlink(public_path('uploads/' . $contribution->files));
                    }
                }
                $contribution->files = $fileName;
            }
        }
        $contribution->name = $request->name;
        $contribution->description = $request->description;
        $contribution->closure_id = $request->closure_id;
        $contribution->attempt_number = $contribution->attempt_number++;
        $contribution->save();

        return $this->sendResponse($contribution, "Contribution Updated Successfully!", 200);
    }
    public function show($id)
    {
        $contribution = Contribution::where('id', $id)->first();
        $comments = Contribution::with('comments')->where('id', $id)->first()->comments;
        $date_calculated_comment = [];

        foreach ($comments as $comment) {
            $user = DB::table('users')
                ->join('comments', 'comments.user_id', '=', 'users.id')
                ->where('comments.id', $comment->id)
                ->where('comments.user_id', $comment->user_id)
                ->first(['users.name as commenter_name']);

            $date_calculated_comment[] = [
                'comment_content' => $comment->content,
                'commenter' => $user->commenter_name,
                'commented_time' => $this->timeDifference($comment->commented_time)
            ];
        }

        $success['contribution'] = $contribution;
        $success['comments'] = $date_calculated_comment;

        return $this->sendResponse($success, "Contribution Retrieved", 200);
    }

    //auth user
    public function downloadContribution($id)
    {
        $contribution = Contribution::findOrFail($id);
        $file = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
        return response()->json($file);
    }

    //this function is used to approve or reject a contribution by marketing coordinator
    public function changeStatus(Request $request, $id)
    {
        //need to ask date
        $request->validate([
            'status' => 'required',
            'closure_id' => 'required|exists:closures,id'
        ]);
        $contribution = Contribution::findOrFail($id);
        $closure = Closure::find($request->closure_id);

        if (Carbon::parse($closure->final_closure_date)->isPast()) {
            return $this->sendError('The closure is expired', 400);
        }

        $student_info = DB::table('contributions')
            ->select(
                'users.id as student_id',
                'faculty_users.faculty_id',
            )
            ->join('users', 'contributions.user_id', '=', 'users.id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('contributions.id', $id)
            ->first();
        $auth_user_info = DB::table("users")
            ->select(
                'faculty_users.user_id',
                'faculty_users.faculty_id'
            )
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('users.id', Auth::user()->id)
            ->first();
        if ($student_info->faculty_id == $auth_user_info->faculty_id) {
            $contribution->update(['status' => $request->status]);
            return $this->sendResponse($contribution, "Contribution Status Updated Successfully!", 200);
        }
        return $this->sendError("You don't have permission to update this contribution", 403);
    }
    // get all uploaded contribution list
    public function UploadedContributionList()
    {
        $user = Auth::user();
        $uploadedcontributions = Contribution::where('user_id', $user->id)->get();
        return $this->sendResponse($uploadedcontributions, 'Uploaded Contribution list', 200);
    }
}
