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
    //admin
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|unique:users|max:255',
            'password' => 'required|min:8',
            'phone' => 'required',
            'role_id' => 'required',
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
            return $user;
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
