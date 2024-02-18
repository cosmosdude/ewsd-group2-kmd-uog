<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('name', 'ASC')->paginate(25);
        return $this->sendResponse($users, "User Retrieved Successfully", 200);
    }


    public function show($id)
    {
        if (Auth::user()->id == $id || Auth::user()->role_id == 1) {
            $user = User::findOrFail($id);
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
        //role_id == 1 means the current user is administrator
        if (Auth::user()->id == $id || Auth::user()->role_id == 1) {
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