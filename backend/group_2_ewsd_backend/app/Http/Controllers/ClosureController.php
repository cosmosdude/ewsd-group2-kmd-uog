<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Closure;
use App\Models\Contribution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use ZipArchive;

class ClosureController extends Controller
{
    public function index()
    {
        $closures = Closure::orderBy('id',  'asc')->paginate(25);
        return $this->sendResponse($closures, "Closures Retrieved Successfully", 200);

    }
    //magazine period filter with academic year
    public function filter(Request $request)
    {
        $academic_year = $request->query('academic_id');
        $closure = Closure::query();
        if ($academic_year) {
            $closure->where('academic_id', $academic_year);
        }
        $filtered = $closure->get();
        return response()->json(['filtered' => $filtered], 200);
    }

    public function show($id)
    {
        $closure = Closure::findOrFail($id);
        return $this->sendResponse($closure, "Closure Found", 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'start_date' => 'required',
            'closure_date' => 'required',
            'final_closure_date' => 'required',
            'academic_id' => 'required'
        ]);
        $closure = Closure::create([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'closure_date' => $request->closure_date,
            'final_closure_date' => $request->final_closure_date,
            'academic_id' => $request->academic_id
        ]);
        return $this->sendResponse($closure, "Closure Created Successfully", 201);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'start_date' => 'required',
            'closure_date' => 'required',
            'final_closure_date' => 'required',
            'academic_id' => 'required'
        ]);
        $closure = Closure::findOrFail($id);
        $closure->update([
            'name' => $request->name,
            'start_date' => $request->start_date,
            'closure_date' => $request->closure_date,
            'final_closure_date' => $request->final_closure_date,
            'academic_id' => $request->academic_id
        ]);
        return $this->sendResponse($closure, "Closure Updated Successfully", 200);
    }

    public function getCurrentClosures()
    {
        $closures = DB::select('CALL check_closure_date()');
        return $this->sendResponse($closures, "Current Closures Retrieved", 200);
    }
    //par ma par ayin may yan
    public function destroy($id)
    {
    }


    //view all submitted contribution within faculty
    //will accept closure id as a parameter
    public function getSubmittedContributionsWithinFaculty($id)
    {
        //retrieve auth user information
        $auth_user_info = DB::table("users")
            ->select(
                'faculty_users.user_id',
                'faculty_users.faculty_id'
            )
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('users.id', Auth::user()->id)
            ->first();

        $contributions = DB::table('contributions')
            ->select(
                'contributions.id',
                'contributions.name as contribution_name',
                'contributions.description',
                'contributions.files',
                'contributions.images',
                'contributions.submitted_date',
                'contributions.attempt_number',
                'contributions.status',
                'contributions.is_commented',
                'contributions.closure_id',
                'users.name as student_name'
            )
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->where('contributions.closure_id', $id)
            ->where('faculty_users.faculty_id', $auth_user_info->faculty_id)
            ->get();
        return $this->sendResponse($contributions, "Submitted Contributions Retrieved", 200);
    }

    //accept closure id as a parameter
    public function downloadApprovedContributions($id)
    {
        $selected_contributions = Contribution::where('closure_id', $id)
            ->where('status', 'approve')
            ->get(['id', 'name', 'files', 'images']);

        // Check if there are approved contributions
        if ($selected_contributions->isEmpty()) {
            return response()->json(['error' => 'No approved contributions found for the given closure ID'], 404);
        }

        $zipFileName = 'download_' . now()->format('YmdHis') . '.zip';
        $zipFilePath = public_path($zipFileName);
        $articlesFolderPath = public_path('Articles') . now()->format('YmdHis');

        // Create the Articles folder
        if (!mkdir($articlesFolderPath) && !is_dir($articlesFolderPath)) {
            return response()->json(['error' => 'Failed to create Articles folder'], 500);
        }

        $zip = new ZipArchive();
        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            return response()->json(['error' => 'Failed to create zip file'], 500);
        }

        foreach ($selected_contributions as $index => $contribution) {
            // Construct folder paths for each article
            $articleFolderName = $contribution->id . '_' . $contribution->name;
            $articleFolderPath = $articlesFolderPath . DIRECTORY_SEPARATOR . $articleFolderName;
            if (!mkdir($articleFolderPath) && !is_dir($articleFolderPath)) {
                return response()->json(['error' => 'Failed to create article folder'], 500);
            }

            // Add doc file to the article folder
            $docFilePath = public_path('uploads') . DIRECTORY_SEPARATOR . $contribution->files;
            $zip->addFile($docFilePath, $articleFolderName . DIRECTORY_SEPARATOR . basename($contribution->files));

            // Add images to the article folder
            $images = explode(",", $contribution->images);
            foreach ($images as $image) {
                $imagePath = public_path('images') . DIRECTORY_SEPARATOR . $image;
                $zip->addFile($imagePath, $articleFolderName . DIRECTORY_SEPARATOR . $image);
            }
        }

        $zip->close();

        // Return the download link
        return response()->json(['download_link' => url($zipFileName)]);
    }
}
