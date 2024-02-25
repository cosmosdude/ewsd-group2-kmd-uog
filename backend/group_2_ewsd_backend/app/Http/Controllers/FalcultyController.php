<?php

namespace App\Http\Controllers;

use App\Models\Falculty;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FalcultyController extends Controller
{
    public function index(){}
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:falculties',
            'phone' => 'required',
            'description' => 'required',
            'room_no' => 'required',
            'building_no' => 'required'
        ]);
        // $falculty = new Falculty;
        // $falculty->name = $request->name;
        // $falculty->email = $request->email;
        // $falculty->phone = $request->phone;
        // $falculty->description = $request->description;
        // $falculty->room_no = $request->room_no;
        // $falculty->building_no = $request->building_no;
        // $result = $falculty->save();
        // if($result){
        //     return response()->json($result);
        // }else{
        //     return ['result'=>'Failed Creation'];
        // }
        $faculty = DB::transaction(function () use ($request) {
            $success['faculty_info'] = Falculty::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'description' => $request->description,
                'room_no' => $request->room_no,
                'building_no' => $request->building_no,
            ]);
            $user = User::create([
                'name' => $request->name . ' Coordinator',
                'email' => $request->email,
                'password' => Hash::make($request->name),
                'phone' => $request->phone,
                //need to manage the role_id
                'role_id' => 3,
            ]);
            $token = $user->createToken('auth_token')->accessToken;
            $success['coordinator_name'] = $user->name;
            $success['email'] = $user->email;
            $success['token'] = $token;
            return $success;
        });
        return $this->sendResponse($faculty,"Faculty Created Successfully",200);
    }
    public function update(Request $request, $id){}

}
