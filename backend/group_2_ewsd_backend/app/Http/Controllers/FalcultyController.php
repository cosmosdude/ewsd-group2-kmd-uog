<?php

namespace App\Http\Controllers;

use App\Models\Falculty;
use App\Http\Controllers\Controller;
use App\Models\FacultyUser;
use App\Models\Role;
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
    public function show($id)
    {
        $faculty = DB::table('falculties')
            ->join('faculty_users', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->join('users', 'users.id', '=', 'faculty_users.user_id')
            ->where('falculties.id', $id)
            ->first([
                'falculties.name as faculty_name',
                'falculties.room_no as room_no',
                'falculties.building_no as building_no',
                'falculties.description as description',
                'users.name as coordinator_name',
                'users.email as coordinator_email',
                'users.phone as coordinator_phone',
            ]);
        return $this->sendResponse($faculty, "Faculty Details", 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            // 'name' => 'required',
            // 'email' => 'required|unique:falculties',
            // 'phone' => 'required',
            // 'description' => 'required',
            // 'room_no' => 'required',
            // 'building_no' => 'required',
            'faculty_name' => 'required',
            'room_no' => 'required',
            'building_no' => 'required',
            'username' => 'required',
            'email' => 'required|unique:falculties,email',
            'phone' => 'required',
            'password' => 'required',
            'description' => 'required'
        ]);
        $role = Role::where('name', 'm_coordinator')->first();
        $faculty = DB::transaction(function () use ($request, $role) {
            $faculty_info = Falculty::create([
                'name' => $request->faculty_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'description' => $request->faculty_name,
                'room_no' => $request->room_no,
                'building_no' => $request->building_no,
                'description' => $request->description
            ]);
            $user = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                //need to manage the role_id
                'role_id' => $role->id,
            ]);
            FacultyUser::create([
                'user_id' => $user->id,
                'faculty_id' => $faculty_info->id,
            ]);
            $success['coordinator_name'] = $user->name;
            $success['email'] = $user->email;
            $success['faculty_info'] = $faculty_info;
            return $success;
        });
        return $this->sendResponse($faculty, "Faculty Created Successfully", 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'faculty_name' => 'required',
            'room_no' => 'required',
            'building_no' => 'required',
            'username' => 'required',
            'email' => 'required|unique:falculties,email,' . $id . ',id',
            'phone' => 'required',
            'description' => 'required',
            'password' => 'required'
        ]);
        $requestData['faculty_name'] = $request->faculty_name;
        $requestData['room_no'] = $request->room_no;
        $requestData['building_no'] = $request->building_no;
        $requestData['username'] = $request->username;
        $requestData['coordinator_email'] = $request->email;
        $requestData['coordinator_phone'] = $request->phone;
        $requestData['description'] = $request->description;
        $requestData['password'] = $request->password;
        $faculty = Falculty::findOrFail($id);
        $coordinator = User::with(['facultyUsers' => function ($q) use ($id) {
            $q->where('faculty_id', $id);
        }])
            ->where('role_id', 3)
            ->first();
        $faculty = DB::transaction(function () use ($requestData, $request, $faculty, $coordinator) {

            $faculty->update([
                'name' => $requestData['faculty_name'],
                'email' => $requestData['coordinator_email'],
                'phone' => $requestData['coordinator_phone'],
                'room_no' => $requestData['room_no'],
                'building_no' => $requestData['building_no'],
                'description' => $requestData['description'],
            ]);
            $coordinator->update([
                'name' => $requestData['username'],
                'email' => $requestData['coordinator_email'],
                'phone' => $requestData['coordinator_phone'],
                'password' => Hash::make($requestData['password']),
            ]);
            $success['faculty'] = $faculty;
            $success['coordinator'] = $coordinator;
            return $success;
        });
        return $this->sendResponse($faculty, "Faculty Updated", 201);
    }
    public function getGuestUserList($id)
    {
        $guests = DB::table('users')
            ->join('roles', 'roles.id', '=', 'users.role_id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->where('faculty_users.faculty_id', $id)
            ->where('users.role_id',5)
            ->get([
                'users.id as guest_id',
                'users.name as guest_name',
                'users.email as guest_email',
                'falculties.name as faculty_name',
            ]);

        return $this->sendResponse($guests, "Guests List", 200);
    }
    public function getStudentAndGuestCount(){
        $counts = DB::table('users')
        ->select(
            'falculties.id as id',
            'falculties.name as name',
            DB::raw('COUNT(CASE WHEN users.role_id = 4 THEN users.id END) as student_count'),
            DB::raw('COUNT(CASE WHEN users.role_id = 5 THEN users.id END) as guest_count')
        )
        ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
        ->join('falculties', 'falculties.id', '=', 'faculty_users.faculty_id')
        ->whereIn('users.role_id', [4, 5])
        ->groupBy('falculties.id', 'falculties.name')
        ->get();
        return $this->sendResponse($counts, "Student and Guest Count", 200);
    }

}
