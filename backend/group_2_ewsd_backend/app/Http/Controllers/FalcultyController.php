<?php

namespace App\Http\Controllers;

use App\Models\Falculty;
use App\Http\Controllers\Controller;
use App\Models\FacultyUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FalcultyController extends Controller
{
    public function index()
    {
        $faculties = Falculty::all();
        return $this->sendResponse($faculties, "Faculty Lists", 200);
    }

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
            $faculty_user = FacultyUser::create([
                'user_id' => $user->id,
                'faculty_id' => $success['faculty_info']->id,
            ]);
            $token = $user->createToken('auth_token')->accessToken;
            $success['coordinator_name'] = $user->name;
            $success['email'] = $user->email;
            $success['token'] = $token;
            return $success;
        });
        return $this->sendResponse($faculty, "Faculty Created Successfully", 200);
    }
    //==============================NEED TO ASK PASSWORD RESET====================================
    public function update(Request $request, $id)
    {
        $request->validate([
            'faculty_id' => 'required',
            'faculty_name' => 'required',
            'room_no' => 'required',
            'building_no' => 'required',
            'coordinator_name' => 'required',
            'coordinator_email' => 'required',
            'coordinator_phone' => 'required',
            //
        ]);

    }
    public function getGuestUserList($id)
    {
        $guests = DB::table('users')
            ->join('roles', 'roles.id', '=', 'users.role_id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->where('faculty_users.faculty_id', $id)
            ->get([
                'users.id as guest_id',
                'users.name as guest_name',
                'users.email as guest_email',
                'falculties.name as faculty_name',
            ]);

        return $this->sendResponse($guests, "Guests List", 200);
    }
}
