<?php

namespace App\Http\Controllers;
use App\Models\Falculty;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FalcultyController extends Controller
{
    //
    function index(){
        $falculty = Falculty::all();
        return $this->sendResponse($falculty, 200);
    }
    function store(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required',
            'description' => 'required',
            'room_no' => 'required',
            'building_no' => 'required'
        ]);
        $falculty = new Falculty;
        $falculty->name = $request->name;
        $falculty->email = $request->email;
        $falculty->phone = $request->phone;
        $falculty->description = $request->description;
        $falculty->room_no = $request->room_no;
        $falculty->building_no = $request->building_no;
        $result = $falculty->save();
        if ($request){
            return $this->sendResponse($result, 'Falculty Createation is Successed', 200);
        }
    }
}
