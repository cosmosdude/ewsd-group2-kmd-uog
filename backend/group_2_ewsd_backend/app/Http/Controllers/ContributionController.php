<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Closure;
use App\Models\Contribution;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\CssSelector\Node\FunctionNode;

class ContributionController extends Controller
{
    public function index()
    {
    }
    public function show($id)
    {
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
            'user_id' => 'required|exists:users,id',
        ]);

        //checking the closure is expired or not
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
            foreach ($request->file('images') as $image) {
                if ($image->isValid()) {
                    $imageName = time() . '.' . $image->getClientOriginalExtension();
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
    }

    public function update(Request $request, $id)
    {
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
            'faculty_users.user_id','faculty_users.faculty_id'
        )
        ->join('faculty_users','users.id','=','faculty_users.user_id')
        ->where('users.id',Auth::user()->id)
        ->first();
        //check student and coordinator has the same faculty
        if($student_info->faculty_id ==$auth_user_info->faculty_id){
           $contribution->update(['status'=>$request->status]);
           return $this->sendResponse($contribution, "Contribution Status Updated Successfully!", 200);
        }
        return $this->sendError("You don't have permission to update this contribution",403);


    }


    public function downloadContribution()
    {
    }
}
