<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FacultyUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function me()
    {
        $user_id = Auth::user()->id;
        $auth_user_info = DB::table('users')
            ->select(
                'users.name as user_name',
                'users.email as user_email',
                'falculties.name as faculty_name',
                'roles.name as role_name',
            )
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->where('users.id', $user_id)
            // ->orderBy('users.name', 'asc')
            ->first();
        return $this->sendResponse($auth_user_info, "User Retrieved Successfully", 200);
    }
    //student registration
    public function studentRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|unique:users|max:255',
            'password' => 'required|min:8',
            'phone' => 'required',
            // 'role_id' => 'required',
            'faculty_id' => 'required',
        ]);
        $user = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'role_id' => $request->role_id,
            ]);
            $faculty_user = FacultyUser::create([
                'user_id' => $user->id,
                'faculty_id' => $request->faculty_id,
            ]);
            $success['user'] = $user;
            $success['faculty_user'] = $faculty_user;
            return $success;
        });
        $token = $user->createToken('auth_token')->accessToken;
        $success['name'] = $user->name;
        $success['email'] = $user->email;
        $success['token'] = $token;
        return $this->sendResponse($success, "User Registered", 200);
    }

    public function login(Request $request)
    {
        // $request->validate();
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->accessToken;
            $success['token'] =  $token;
            $success['name'] =  $user->name;
            return $this->sendResponse($success, 'User login successfully.', 200);
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised'], 401);
        }
    }
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return $this->sendResponse([], 'User logout successfully.', 200);
    }
    //guest
    public function guestRegister(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required|min:8',
            'faculties' => 'required|array'
        ]);
        $guest = DB::transaction(function () use ($request) {
            $u = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => 5 //guest role id
            ]);
            foreach ($request->faculties as $faculty) {
                FacultyUser::create([
                    'user_id' => $u->id,
                    'faculty_id' => $faculty
                ]);
            }
            return $u;
        });
        $token = $guest->createToken('auth_token')->accessToken;
        $success['name'] = $guest->name;
        $success['email'] = $guest->email;
        $success['token'] = $token;
        return $this->sendResponse($success, "Guest Registered", 200);
    }
}
