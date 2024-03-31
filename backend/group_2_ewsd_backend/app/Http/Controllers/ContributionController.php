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
    public function index()
    {
        $userId = Auth::user()->faculty_id;

        $currentClosures = $this->getCurrentClosures();

        $contributions = DB::table('contributions')
            ->join('users', 'contributions.user_id', '=', 'users.id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->join('closures', 'closures.id', '=', 'contributions.closure_id')
            ->where('faculty_users.faculty_id', $userId)
            ->whereIn('contributions.closure_id', collect($currentClosures)->pluck('id'))
            ->get([
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
            foreach ($images as $index => $image) {
                $images[$index] = public_path('images') . DIRECTORY_SEPARATOR . $image;
            }
            $contribution->images = $images;
        }

        return $this->sendResponse($contribution, "Contribution List", 200);
    }

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
                    ->where('closures.id', $request->closure_id)
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
                        'closures.id as closure_id'
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
                    ->where('closures.id', $request->closure_id)
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
                    ->where('closures.id', $request->closure_id)
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
                    ->where('closures.id', $request->closure_id)
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
            } elseif ($request->status == 'pending') {
                $contributions = DB::table('contributions')
                    ->join('closures', 'closures.id', '=', 'contributions.closure_id')
                    ->join('users', 'users.id', '=', 'contributions.user_id')
                    ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
                    ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                    ->where('closures.id', $request->closure_id)
                    ->where('contributions.user_id', Auth::user()->id)
                    ->where('contributions.status', 'upload')
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
                // Merge contributions into $selectedContributions array
                $selectedContributions = array_merge($selectedContributions, $contributions->toArray());
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

        if (Carbon::parse($closure->closure_date)->addDay()->isPast()) {
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

        // return response()->json(Auth::user());
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
        if ($user->role_id === 4) {
            $coordinator = User::join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
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
        $user_info = DB::table('users')->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')->join('falculties', 'falculties.id', '=', 'faculty_users.faculty_id')
            ->where('users.id', $contribution->user_id)
            ->first([
                'users.name as student_name',
                'falculties.name as student_faculty_name',
            ]);
        $comments = Contribution::with('comments')->where('id', $id)->first()->comments;
        $date_calculated_comment = [];

        foreach ($comments as $comment) {
            $user = DB::table('users')
                ->join('comments', 'comments.user_id', '=', 'users.id')
                ->where('comments.id', $comment->id)
                ->where('comments.user_id', $comment->user_id)
                ->first(['users.name as commenter_name']);

            $date_calculated_comment[] = [
                'commenter_id' => $comment->user_id,
                'comment_content' => $comment->content,
                'commenter' => $user->commenter_name,
                'commented_time' => $this->timeDifference($comment->commented_time)
            ];
        }

        $success['contribution'] = $contribution;
        $success['comments'] = $date_calculated_comment;
        $success['contributor'] = $user_info;

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

        if (Carbon::parse($closure->final_closure_date)->addDay()->isPast()) {
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
    //contribution list of current closure
    public function getCurrentClosureContributionList()
    {

        $closure = new ClosureController();
        $currentclosure = $closure->getCurrentClosures();

        $contributions = Contribution::select(
            'contributions.name as Title',
            'closures.start_date',
            'closures.closure_date',
            'closures.final_closure_date',
        )
            ->join('closures', 'closures.id', '=', 'contributions.closure_id')
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->join('faculties', 'faculty_users.faculty_id', '=', 'faculties.id')
            ->where('faculty_users.faculty_id', '=', $coordinator->faculty_id)
            ->where('closures.id', $currentclosure->id)
            ->get();

        return $this->sendResponse($contributions, "Current Closure of Contribution List", 200);
    }
    public function addReadCount($id)
    {
        if (Auth::user()->hasRole('student') || Auth::user()->hasRole('guest')) {
            $contribution = Contribution::findOrFail($id);
            $contribution->update(['read_count' => ++$contribution->read_count]);
            $user = User::findOrFail(Auth::user()->id);
            $user->update([
                'view_count' => ++$user->view_count
            ]);
            return $this->sendResponse($contribution, "Contribution Read Count Updated Successfully!", 200);
        }
        return $this->sendError("Nothing will change since you are not student or guest role", 403);
    }
    public function getCommentCount()
    {
        $success['comment'] = Contribution::where('is_commented', 1)->get()->count();
        $success['uncomment'] = Contribution::where('is_commented', 0)->get()->count();
        $uncommented =   Contribution::where('is_commented', 0)->get();
        $overdue_count = 0;
        foreach ($uncommented as $u) {
            $submitted_date = Carbon::parse($u->submitted_date);
            $day_diff = Carbon::now()->diffInDays($submitted_date);
            if ($day_diff > 14) {
                $overdue_count += 1;
            }
        }
        $success['overdue'] = $overdue_count;
        return $this->sendResponse($success, "Comment Counts for Admin Dashboard", 200);
    }
    //most uploaded student list
    public function getMostlyUploadContribution()
    {
        $contributions = DB::table('contributions')
            ->join('users', 'contributions.user_id', 'users.id')
            ->select('users.id', 'users.name', DB::raw('count(*) as mostly_uploaded'))
            ->groupBy('users.id',  'users.name')
            ->orderBy('mostly_uploaded', 'ASC')
            ->limit(3)
            ->get(
                'users.name as student_name',
                'mostly_uploaded'
            );

        return $this->sendResponse($contributions, "Mostly uploaded Student", 200);
    }

    //most active user list
    public function getMostActiveUserList()
    {

        $users = User::whereIn('role_id', [4, 5])->orderBy('view_count', 'desc')->get();
        return $this->sendResponse($users, "Most Active User List", 200);
    }

    public function getPieChartforAdmin(Request $request)
    {
        $request->validate([
            'academic_id' => 'required'
        ]);

        //faculty-> number of contribution according to the acacdemic_year
        //closures,contributions,users, faculty_users
        $contributionsCount = DB::table('closures')
        ->join('contributions','contributions.closure_id','=','closures.id')
        ->join('users','users.id','=','contributions.user_id')
        ->join('faculty_users','users.id','=','faculty_users.user_id')
        ->join('falculties','falculties.id','=','faculty_users.faculty_id')
        ->where('closures.academic_id',$request->academic_id)
        ->select(['falculties.id','falculties.name',DB::raw('COUNT(contributions.id) as countribution_count')])
        ->groupBy('falculties.id','falculties.name')
        ->get();
        return $this->sendResponse($contributionsCount, "Number of contributions",200);


        // $academic_year = $request->query('academic_id');

        // if ($academic_year) {
        //     $numberOfContributions = DB::table('falculties')
        //         ->join('faculty_users', 'faculty_users.faculty_id', '=', 'falculties.id')
        //         ->join('users', 'faculty_users.user_id', '=', 'users.id')
        //         ->join('contributions', 'contributions.user_id', '=', 'users.id')
        //         ->join('closures', 'closures.id', '=', 'contributions.closure_id')
        //         ->select(
        //             'falculties.name as Faculty_name',
        //             DB::raw('COUNT(DISTINCT contributions.id) as Number_of_Contributions')
        //         )
        //         ->where('closures.academic_id', $academic_year)
        //         ->groupBy('falculties.name');

        //     $numberOfContributors = DB::table('falculties')
        //         ->join('faculty_users', 'faculty_users.faculty_id', '=', 'falculties.id')
        //         ->join('users', 'faculty_users.user_id', '=', 'users.id')
        //         ->join('contributions', 'contributions.user_id', '=', 'users.id')
        //         ->join('closures', 'closures.id', '=', 'contributions.closure_id')
        //         ->select(
        //             'falculties.name as Faculty_name',
        //             DB::raw('COUNT(DISTINCT contributions.user_id) as Number_of_Contributors')
        //         )
        //         ->where('closures.academic_id', $academic_year)
        //         ->groupBy('falculties.name');

        //     $numberOfContributionsResult = $numberOfContributions->get();
        //     $numberOfContributorsResult = $numberOfContributors->get();

        //     $percentOfContributions = collect($numberOfContributionsResult)->map(function ($item, $key) use ($numberOfContributorsResult) {
        //         $percentage = 0;
        //         if ($numberOfContributorsResult[$key]->Number_of_Contributors > 0) {
        //             $percentage = ($item->Number_of_Contributions / $numberOfContributorsResult[$key]->Number_of_Contributors) * 100;
        //         }
        //         return [
        //             'Faculty_Name' => $item->Faculty_name,
        //             'Percentage_Of_Contributions' => $percentage . '%'
        //         ];
        //     });

        //     return $this->sendResponse($percentOfContributions->toArray(), "Contributions by Faculty", 200);
        // }

        // return $this->sendResponse("Academic year is not provided", 403);
    }
}
