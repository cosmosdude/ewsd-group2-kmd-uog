<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AcademicYear;
use Illuminate\Http\Request;

class AcademicYearController extends Controller
{
    public function index()
    {
        $academic_years = AcademicYear::orderBy('id', 'desc')->paginate(25);
        return $this->sendResponse($academic_years, 'Academic Year Lists', 200);
    }
    public function show($id)
    {
        $academic_year = AcademicYear::findOrFail($id);
        return $this->sendResponse($academic_year, 'Details Academic Year Information', 200);
    }
}
