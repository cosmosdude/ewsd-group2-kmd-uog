<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AcademicYearController extends Controller
{
    //
    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required'
        ]);
        $academic_year = AcademicYear::create([
            'name' => $request->name,
            'start_date'=> $request->start_date,
            'end_date' => $request->end_date,
        ]);
        return $this->sendResponse($academic_year, "Academic Year Created Successfully", 201);
    }
    public function update($id, Request $request){
        $request->validate([
            'name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required'
        ]);
        $academic_year = AcademicYear::findOrFail($id);
        $academic_year->update([
            'name' => $request->name,
            'start_date'=> $request->start_date,
            'end_date' => $request->end_date,
        ]);
        return $this->sendResponse($academic_year, "Academic Year Updated Successfully", 201);
    }
}
