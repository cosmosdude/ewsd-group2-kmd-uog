<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Role;
use App\Models\Closure;
use App\Models\Contribution;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Notifications\FileUploadedNotification;

class ContributionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->role !== 4){
            return response()->json(['error'=>'Unauthorized', 401]);
        }
        $contributions = Contribution::all();
        return response()->json(['contributions' => $contributions], 200);
    }
    public function show($id)
    {
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'files' => 'required|mimes:doc,docx,pdf',
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
            'status' => 'upload',
            'is_commented' => 0,
            'closure_id' => $request->closure_id,
            'user_id' => Auth::user()->id
        ];

        if (!empty($uploadedImages)) {

            $contributionData['images'] =  implode(',', $uploadedImages);
        }

        $contribution = Contribution::create($contributionData);

        //send email noti to coordiantor

        $this->sendEmailWithFile($uploadedFiles,$uploadedImages);


        return $this->sendResponse($contribution, "Contribution Created Successfully!", 201);
    }
    //send email noti to coordiantor
    private function sendEmailWithFiles($uploadedFiles, $uploadedImages){
        $recipient = 'yopmail.com';
        $subject = 'New Article Uploaded';
        $content = 'New Article have been uploaded from Student' .'_'.$request->name;

        Mail::to($recipient)->send(new Contribution($subject, $content, $uploadedFiles, $uploadedImages));
    }

    public function update(Request $request, $id)
    {
    }
}
