<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Closure;
use App\Models\Contribution;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class ContributionController extends Controller
{
    //need to fix this index function
    //the role attribute is not define and should be replace with function
    //need to add comment count in this function
    public function index()
    {
        $user = Auth::user();
        if ($user->role !== 4) {
            return response()->json(['error' => 'Unauthorized', 401]);
        }
        $contributions = Contribution::all();
        return response()->json(['contributions' => $contributions], 200);
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

        //send email noti to coordiantor

        $this->sendEmailWithFile($uploadedFiles, $uploadedImages);

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
        $contribution = Contribution::with('comments')
            ->where('id', $id)
            ->get();
        return $this->sendResponse($contribution, "Contribution Retrieved", 200);
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
        //check the contribution exists or not
        $contribution = Contribution::findOrFail($id);
        //get closure information
        $closure = Closure::find($request->closure_id);
        //check the final closure date is valid or not
        if (Carbon::parse($closure->final_closure_date)->isPast()) {
            return $this->sendError('The closure is expired', 400);
        }
        //get contribution uploaded student id, and student faculty id
        $student_info = DB::table('contributions')
            ->select(
                'users.id as student_id',
                'faculty_users.faculty_id',
            )
            ->join('users', 'contributions.user_id', '=', 'users.id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('contributions.id', $id)
            ->first();
        //check Auth user is coordinator
        $auth_user_info = DB::table("users")
            ->select(
                'faculty_users.user_id',
                'faculty_users.faculty_id'
            )
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('users.id', Auth::user()->id)
            ->first();
        //check student and coordinator has the same faculty
        if ($student_info->faculty_id == $auth_user_info->faculty_id) {
            $contribution->update(['status' => $request->status]);
            return $this->sendResponse($contribution, "Contribution Status Updated Successfully!", 200);
        }
        return $this->sendError("You don't have permission to update this contribution", 403);
    }


    //send email noti to coordiantor
    private function sendEmailWithFiles($uploadedFiles, $uploadedImages)
    {
        $recipient = 'yopmail.com';
        $subject = 'New Article Uploaded';
        $content = 'New Article have been uploaded from Student' . '_' . $request->name;

        Mail::to($recipient)->send(new Contribution($subject, $content, $uploadedFiles, $uploadedImages));
    }
}
