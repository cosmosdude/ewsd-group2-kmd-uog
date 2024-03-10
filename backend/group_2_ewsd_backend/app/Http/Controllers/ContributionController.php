<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Closure;
use App\Models\Contribution;
use Illuminate\Http\Request;
use App\Mail\ArticleUploaded;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Falculty;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;


class ContributionController extends Controller
{

    //all contribution only for m_coordinator and student
    public function getAllContributionsByCoordinatorAndStudent(Request $request)
    {
        $request->validate([
            'status' => 'required',
            'closure_id' => 'required'
        ]);
        if (Auth::user()->hasRole('m_coordinator')) {

            // public_path('uploads') . DIRECTORY_SEPARATOR .
            // public_path('images') . DIRECTORY_SEPARATOR .
            $mc_faculty_id = DB::table('users')
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->where('users.id', Auth::user()->id)
                ->first('faculty_users.faculty_id')
                ->faculty_id;
            if ($request->status == 'all' || $request->status == 'All') {
                $contributions = DB::table('closures')
                    ->join('contributions', 'contributions.closure_id', '=', 'closures.id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('faculty_users.faculty_id', $mc_faculty_id)
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                // $images = [];
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $index => $image) {
                        $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                    $contribution->images = $images;
                    $comment_count = Comment::where('contribution_id', $contribution->contribution_id)->count();
                    $contribution->comment_count = $comment_count;
                }

                return $this->sendResponse($contributions, "All Contribution Retrieved", 200);
            } elseif ($request->status == 'non-commented' || $request->status == 'Non-Commented' || $request->status == 'NonCommented') {
                $contributions = DB::table('closures')
                    ->join('contributions', 'contributions.closure_id', '=', 'closures.id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('faculty_users.faculty_id', $mc_faculty_id)
                    ->where('contributions.is_commented', 0)
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                // $images = [];
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $index => $image) {
                        $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                    $contribution->images = $images;
                    $comment_count = Comment::where('contribution_id', $contribution->contribution_id)->count();
                    $contribution->comment_count = $comment_count;
                }
                return $this->sendResponse($contributions, "Uncommented Contribution Retrieved", 200);
            } elseif ($request->status == 'commented' || $request->status == 'Commented') {
                $contributions = DB::table('closures')
                    ->join('contributions', 'contributions.closure_id', '=', 'closures.id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('faculty_users.faculty_id', $mc_faculty_id)
                    ->where('contributions.is_commented', 1)
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                // $images = [];
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $index => $image) {
                        $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                    $contribution->images = $images;
                    $comment_count = Comment::where('contribution_id', $contribution->contribution_id)->count();
                    $contribution->comment_count = $comment_count;
                }
                return $this->sendResponse($contributions, "Commented Contribution Retrieved", 200);
            } elseif ($request->status == 'overdue' || $request->status == 'Overdue') {
                $contributions = DB::table('closures')
                    ->join('contributions', 'contributions.closure_id', '=', 'closures.id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('faculty_users.faculty_id', $mc_faculty_id)
                    ->where('contributions.is_commented', 0)
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status',
                    ]);
                // $images = [];
                $overdue_contributions = [];
                foreach ($contributions as $contribution) {
                    // $contribution->submitted_date = Carbon::parse($contribution->submitted_date)->format('d-m-Y');
                    $submitted_date = Carbon::parse($contribution->contribution_submitted_date);
                    $day_diff = Carbon::now()->diffInDays($submitted_date);
                    if ($day_diff > 14) {
                        $overdue_contributions[] = $contribution;
                    }
                }
                foreach ($overdue_contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $index => $image) {
                        $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                    $contribution->images = $images;
                    $comment_count = Comment::where('contribution_id', $contribution->contribution_id)->count();
                    $contribution->comment_count = $comment_count;
                }
                return $this->sendResponse($overdue_contributions, "Overdue Contributions Retrieved", 200);
            }
        } elseif (Auth::user()->hasRole('student')) {
            if ($request->status == 'all' || $request->status == 'All') {
                $contributions = DB::table('contributions')
                    ->join('closures', 'closures.id', '=', 'contributions.closure_id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('closures.id', $request->closure_id)
                    ->where('contributions.user_id', Auth::user()->id)
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                // $images = [];
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $index => $image) {
                        $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                    $contribution->images = $images;
                    $comment_count = Comment::where('contribution_id', $contribution->contribution_id)->count();
                    $contribution->comment_count = $comment_count;
                }
                return $this->sendResponse($contributions, "Contributions Retrieved Successfully", 200);
            } elseif ($request->status == 'approve') {
                $contributions = DB::table('contributions')
                    ->join('closures', 'closures.id', '=', 'contributions.closure_id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('closures.id', $request->closure_id)
                    ->where('contributions.user_id', Auth::user()->id)
                    ->where('contributions.status', 'approve')
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                // $images = [];
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $index => $image) {
                        $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                    $contribution->images = $images;
                    $comment_count = Comment::where('contribution_id', $contribution->contribution_id)->count();
                    $contribution->comment_count = $comment_count;
                }
                return $this->sendResponse($contributions, "Approved Contributions Retrieved Successfully", 200);
            } elseif ($request->status == 'reject') {
                $contributions = DB::table('contributions')
                    ->join('closures', 'closures.id', '=', 'contributions.closure_id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('closures.id', $request->closure_id)
                    ->where('contributions.user_id', Auth::user()->id)
                    ->where('contributions.status', 'reject')
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                // $images = [];
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $index => $image) {
                        $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                    $comment_count = Comment::where('contribution_id', $contribution->contribution_id)->count();
                    $contribution->comment_count = $comment_count;
                }
                return $this->sendResponse($contributions, "Rejected Contributions Retrieved Successfully", 200);
            }
        }
    }

    public function getAllSelectedContributions(Request $request)
    {
        $request->validate([
            'closure_id' => 'required',
            'faculty_id' => 'nullable',
        ]);
        if (Auth::user()->hasRole('guest')) {
            $registered_faculties = [];
            if ($request->faculty_id) {
                $registered_faculties = DB::table('users')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->where('users.id', Auth::user()->id)
                    ->where('faculty_users.faculty_id', $request->faculty_id)
                    ->get([
                        'faculty_users.faculty_id'
                    ]);
            } else {
                $registered_faculties = DB::table('users')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->where('users.id', Auth::user()->id)
                    ->get([
                        'faculty_users.faculty_id'
                    ]);
            }
            $selectedContributions = [];
            foreach ($registered_faculties as $faculty) {
                $contributions = DB::table('contributions')
                    ->join('closures', 'closures.id', '=', 'contributions.closure_id')
                    ->join('users', 'contributions.user_id', '=', 'users.id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('contributions.status', 'approve')
                    ->where('faculty_users.faculty_id', $faculty->faculty_id)
                    ->where('contributions.closure_id', $request->closure_id)
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $image) {
                        $images = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                }
                $selectedContributions[] = $contributions;
            }

            return $this->sendResponse($selectedContributions, "Selected Contribution for Guest", 200);
        } elseif (Auth::user()->hasRole('administrator') || Auth::user()->hasRole('m_manager') || Auth::user()->hasRole('m_coordinator') || Auth::user()->hasRole('student')) {
            if ($request->faculty_id) {
                // dd($request->faculty_id);
                $contributions = DB::table('contributions')
                    ->join('closures', 'closures.id', '=', 'contributions.closure_id')
                    ->join('users', 'contributions.user_id', '=', 'users.id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('contributions.status', 'approve')
                    ->where('faculty_users.faculty_id', $request->faculty_id)
                    ->where('contributions.closure_id', $request->closure_id)
                    ->get([
                        'falculties.id as faculty_id',
                        'falculties.name as faculty_name',
                        'users.id as user_id',
                        'users.name as user_name',
                        'users.email as user_email',
                        'contributions.id as contribution_id',
                        'contributions.name as contribution_name',
                        'contributions.description as contribution_description',
                        'contributions.images',
                        'contributions.files',
                        'contributions.submitted_date as contribution_submitted_date',
                        'contributions.attempt_number as contribution_attempt_number',
                        'contributions.status as contribution_status'
                    ]);
                foreach ($contributions as $contribution) {
                    $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                    $images = explode(",", $contribution->images);
                    foreach ($images as $image) {
                        $images = public_path('images') . DIRECTORY_SEPARATOR . $image;
                    }
                    $contribution->images = $images;
                }
                return $this->sendResponse($contributions, "Selected Contributions for System Users Retrieved Successfully", 200);
            } else {
                $faculties = Falculty::all();

                $selectedContributions = [];
                foreach ($faculties as $faculty) {
                    $contributions = DB::table('contributions')
                        ->join('closures', 'closures.id', '=', 'contributions.closure_id')
                        ->join('users', 'contributions.user_id', '=', 'users.id')
                        ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                        ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                        ->where('contributions.status', 'approve')
                        ->where('faculty_users.faculty_id', $faculty->id)
                        ->where('contributions.closure_id', $request->closure_id)
                        ->get([
                            'falculties.id as faculty_id',
                            'falculties.name as faculty_name',
                            'users.id as user_id',
                            'users.name as user_name',
                            'users.email as user_email',
                            'contributions.id as contribution_id',
                            'contributions.name as contribution_name',
                            'contributions.description as contribution_description',
                            'contributions.images',
                            'contributions.files',
                            'contributions.submitted_date as contribution_submitted_date',
                            'contributions.attempt_number as contribution_attempt_number',
                            'contributions.status as contribution_status'
                        ]);

                    foreach ($contributions as $contribution) {
                        $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
                        $images = explode(",", $contribution->images);
                        $contribution->images = array_map(function ($image) {
                            return public_path('images') . DIRECTORY_SEPARATOR . $image;
                        }, $images);
                        $selectedContributions[] = $contribution;
                    }
                }

                return $this->sendResponse($selectedContributions, "Selected Contributions for System Users Retrieved", 200);
            }
        }
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'files' => 'required|mimes:doc,docx',
            'images' => 'nullable|max:5',
            // |mimes:jpg,jpeg,png
            'closure_id' => 'required|exists:closures,id',
            //'user_id' => 'required|exists:users,id',
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

        return response()->json(Auth::user());
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

        //if student of faculty_id and coordinator of faculty_id are the same send email
        $user = auth()->user();
        if ($user->role_id === 4){
            $coordinator = User::join('faculty_users', 'users.id', '=' , 'faculty_users.user_id')
                                ->where('faculty_users.faculty_id', $user->faculty_id)
                                ->where('users.role_id', 3)
                                ->first();
        }
        if ($coordinator) {
            //if there has a problem display with dd first
            //dd($coordinator);
            Mail::to($coordinator->email)->send(new ArticleUploaded($coordinator->name, $user->name, $contribution));
        }
        return $this->sendResponse($contribution, "Contribution Created Successfully!", 201);

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
        $contribution->files = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
        // public_path('images') . DIRECTORY_SEPARATOR .
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
