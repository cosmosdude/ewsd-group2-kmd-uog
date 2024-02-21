<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClosureController extends Controller
{
    public function index()
    {
        $closures = Closure::orderBy('id', 'asc')->paginate(25);
        return $this->sendResponse($closures, "Closures Retrieved Successfully", 200);
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

    public function getCurrentClosures(){
        $closures = DB::select('CALL check_closure_date()');
        return $this->sendResponse($closures,"Current Closures Retrieved",200);
    }
    //par ma par ayin may yan
    public function destroy($id)
    {

    }
}
