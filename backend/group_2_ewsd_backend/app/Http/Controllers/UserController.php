<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {

        $users = DB::table('users')
            ->select(
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email',
                'falculties.name as faculty_name',
                'faculty_users.faculty_id',
                'roles.id as role_id',
                'roles.name as role_name',
            )
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->get();
        return $this->sendResponse($users, "User Retrieved Successfully", 200);
    }


    public function show($id)
    {
        if (Auth::user()->id == $id || Auth::user()->hasRole('administrator')) {
            $user = DB::table('users')
                ->select(
                    'users.id as user_id',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.phone as user_phone',
                    'falculties.name as faculty_name',
                    'faculty_users.faculty_id',
                    'roles.id as role_id',
                    'roles.name as role_name',
                )
                ->join('roles', 'users.role_id', '=', 'roles.id')
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
                ->where('users.id', $id)
                // ->orderBy('users.name', 'asc')
                ->first();
            return $this->sendResponse($user, "User Retrieved Successfully", 200);
        }
        return $this->sendError($id, "You don't have permission to view this user", 403);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',

        ]);
        if (Auth::user()->id == $id || Auth::user()->hasRole('administrator')) {
            $user = User::findOrFail($id);
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);
            return $this->sendResponse($user, "User Updated Successfully", 200);
        }
    }

    //this search function is  not added in the sprint, I added this function because of my own assumptions
    public function searchUser(Request $request)
    {
        $request->validate([
            'keyword' => 'required',

        ]);
        $users = User::where('id', $request->keyword)
            ->orWhere('name', 'LIKE', '%' . $request->keyword . '%')
            ->orWhere('email', 'LIKE', '%' . $request->keyword . '%')
            ->paginate(25);
        return $this->sendResponse($users, "User Search Results", 200);
    }
}
