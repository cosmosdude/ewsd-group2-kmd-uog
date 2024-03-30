<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\FacultyUser;
use App\Models\Falculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{


    public function index()
    {
        $users = DB::table('users')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->select(
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email',
                'users.phone as user_phone',
                'users.last_login_time as last_login_time',
                'falculties.name as faculty_name',
                'roles.id as role_id',
                'roles.name as role_name'
            )
            ->orderBy('users.id')
            ->get();

        $formattedUsers = [];
        foreach ($users as $user) {
            $userId = $user->user_id;
            if (!isset($formattedUsers[$userId])) {
                $formattedUsers[$userId] = [
                    'user_id' => $userId,
                    'user_name' => $user->user_name,
                    'user_email' => $user->user_email,
                    'user_phone' => $user->user_phone,
                    'role_id' => $user->role_id,
                    'role_name' => $user->role_name,
                    'last_login_time' => $this->timeDifference($user->last_login_time),
                    'faculty_info' => []
                ];
            }
            $formattedUsers[$userId]['faculty_names'][] = $user->faculty_name;
        }
        $formattedUsers = array_values($formattedUsers);

        return $this->sendResponse($formattedUsers, "User Retrieved Successfully", 200);
    }

    public function show($id)
    {
        $authenticatedUserId = Auth::user()->id;

        if ($authenticatedUserId == $id || Auth::user()->hasRole('administrator')) {
            $user = DB::table('users')
                ->select(
                    'users.id as user_id',
                    'users.name as user_name',
                    'users.email as user_email',
                    'users.phone as user_phone',
                    'users.last_login_time as user_last_access_time',
                    'roles.id as role_id',
                    'roles.name as role_name'
                )
                ->join('roles', 'users.role_id', '=', 'roles.id')
                ->where('users.id', $id)
                ->orderBy('users.id')
                ->first();

            if ($user) {
                $faculties = DB::table('falculties')
                    ->select('falculties.name as faculty_name')
                    ->join('faculty_users', 'falculties.id', '=', 'faculty_users.faculty_id')
                    ->where('faculty_users.user_id', $id)
                    ->pluck('faculty_name')
                    ->toArray();

                $user->faculty_name = $faculties;
                $user->user_last_access_time = $this->timeDifference($user->user_last_access_time);
                return $this->sendResponse($user, "User Retrieved Successfully", 200);
            } else {
                return $this->sendError(null, "User not found", 404);
            }
        }

        return $this->sendError(null, "You don't have permission to view this user", 403);
    }



    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'password' => 'required',

        ]);
        if (Auth::user()->id == $id || Auth::user()->hasRole('administrator')) {
            $user = User::findOrFail($id);
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password)
            ]);
            return $this->sendResponse($user, "User Updated Successfully", 200);
        }
    }


    public function searchStudent(Request $request)
    {
        $request->validate([
            'keyword' => 'required',
        ]);
        if (Auth::user()->hasRole('administrator')) {
            $students = DB::table('users')
                ->select(
                    'users.name as student_name',
                    'users.email as student_email',
                    'users.phone as student_phone',
                    'users.last_login_time as last_access',
                    'falculties.name as faculty_name',
                )
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->join('falculties', 'falculties.id', '=', 'faculty_users.faculty_id')
                ->where('users.role_id', 4)
                ->where('users.name', 'LIKE', '%' . $request->keyword . '%')
                ->where('users.email', 'LIKE', '%' . $request->keyword . '%')
                ->where('falculties.name', 'LIKE', '%' . $request->keyword . '%')
                ->paginate(25);
        } elseif (Auth::user()->hasRole('m_coordinator')) {
            $coordinator_faculty = DB::table('users')
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->first(
                    'faculty_users.faculty_id'
                );
            $students = DB::table('users')
                ->select(
                    'users.name as student_name',
                    'users.email as student_email',
                    'users.phone as student_phone',
                    'users.last_login_time as last_access',
                    'falculties.name as faculty_name',
                )
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->join('falculties', 'falculties.id', '=', 'faculty_users.faculty_id')
                ->where('faculty_users.faculty_id', $coordinator_faculty->faculty_id)
                ->where('users.role_id', 4)
                ->where('users.name', 'LIKE', '%' . $request->keyword . '%')
                ->orWhere('users.email', 'LIKE', '%' . $request->keyword . '%')
                ->orWhere('falculties.name', 'LIKE', '%' . $request->keyword . '%')
                ->paginate(25);
        }

        return $this->sendResponse($students, "User Search Results", 200);
    }

    public function getStudentList()
    {

        if (Auth::user()->hasRole('administrator')) {
            $students = DB::table('users')
                ->select(
                    'users.name as student_name',
                    'users.email as student_email',
                    'users.phone as student_phone',
                    'users.last_login_time as last_access',
                    'falculties.name as faculty_name',
                )
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->join('falculties', 'falculties.id', '=', 'faculty_users.faculty_id')
                ->where('users.role_id', 4)
                ->get();
            // return response()->json($students);
        } elseif (Auth::user()->hasRole('m_coordinator')) {
            $coordinator_faculty = DB::table('users')
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->first(
                    'faculty_users.faculty_id'
                );
            $students = DB::table('users')
                ->select(
                    'users.name as student_name',
                    'users.email as student_email',
                    'users.phone as student_phone',
                    'users.last_login_time as last_access',
                    'falculties.name as faculty_name',
                )
                ->join('faculty_users', 'users.id', '=', 'faculty_users.user_id')
                ->join('falculties', 'falculties.id', '=', 'faculty_users.faculty_id')
                ->where('faculty_users.faculty_id', $coordinator_faculty->faculty_id)
                ->where('users.role_id', 4)
                ->get();
        }

        foreach ($students as $student) {
            if ($student->last_access == null) {
                $student->last_access = "Haven't Login";
            } else {
                $student->last_access = $this->timeDifference($student->last_access);
            }
        }
        return $this->sendResponse($students, "Student List", 200);
    }
    public function registerFacultyByGuest(Request $request)
    {
        $request->validate([
            'faculties' => 'required|array'
        ]);
        $registered_faculties = FacultyUser::where('user_id', Auth::user()->id)->pluck('faculty_id');
        $checked_list = [];
        foreach ($request->faculties as $faculty) {
            //check the faculty is already registered or not
            if ($registered_faculties->contains($faculty)) {
                return $this->sendError(null, "You have already registered this faculty", 403);
            } else {
                $checked_list[] = $faculty;
            }
        }
        foreach ($checked_list as $faculty) {
            FacultyUser::create([
                'user_id' => Auth::user()->id,
                'faculty_id' => $faculty
            ]);
        }
        return $this->sendResponse(Auth::user()->name, "Faculty Registered Successfully");
    }
    public function getUnregisteredFacultyOfGuest()
    {
        $registered_faculties = DB::table('users')
            ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
            ->where('users.id', Auth::user()->id)
            ->pluck('faculty_users.faculty_id')
            ->toArray();
        $faculties = Falculty::all()->pluck("id")->toArray();
        $unregistered_faculties = array_diff($faculties, $registered_faculties);
        $unregistered_faculties = array_values($unregistered_faculties);
        return $this->sendResponse($unregistered_faculties, "Unregistered faculties", 200);
    }
}
