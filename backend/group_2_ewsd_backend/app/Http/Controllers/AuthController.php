<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AcademicHistory;
use App\Models\AcademicYear;
use App\Models\Browser;
use App\Models\FacultyUser;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function me()
    {
        $user_id = Auth::user()->id;
        $auth_user_info = DB::table('users')
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
            ->where('users.id', $user_id)
            // ->orderBy('users.name', 'asc')
            ->first();
        return $this->sendResponse($auth_user_info, "User Retrieved Successfully", 200);
    }
    //academic_id par yin student_registration
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'email' => 'required|unique:users|max:255|email',
            'password' => 'required|min:8',
            'phone' => 'required',
            //'role_id' => 'required',
            'faculty_id' => 'required',
            // 'academic_id' => 'required',
        ]);
        if ($request->academic_id) {
            $user = DB::transaction(function () use ($request) {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password),
                    'phone' => $request->phone,
                    'role_id' => 4,
                    'academic_id' => $request->academic_id
                ]);
                $faculty_user = FacultyUser::create([
                    'user_id' => $user->id,
                    'faculty_id' => $request->faculty_id,
                ]);
                $academic_histories = AcademicHistory::create([
                    'user_id' => $user->id,
                    'academic_year_id' => $request->academic_id,
                    'active_status' => 'active',
                ]);
                $success['user'] = $user;
                $success['faculty_user'] = $faculty_user;
                $success['academic_histories'] = $academic_histories;
                return $success;
            });
            $token = $user['user']->createToken('auth_token')->accessToken;
            $success['name'] = $user['user']->name;
            $success['email'] = $user['user']->email;
            $success['token'] = $token;
            return $this->sendResponse($success, "Student Registered", 200);
        }
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
            $academic_histories =
                $success['user'] = $user;
            $success['faculty_user'] = $faculty_user;
            return $success;
        });
        $token = $user['user']->createToken('auth_token')->accessToken;
        $success['name'] = $user['user']->name;
        $success['email'] = $user['user']->email;
        $success['token'] = $token;
        return $this->sendResponse($success, "User Registered", 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' =>'required|email',
            'password' => 'required',
            'browser' => 'nullable'
        ]);
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->accessToken;
            $faculty_id = FacultyUser::where('user_id', $user->id)->pluck('faculty_id')->first();;
            $success['token'] =  $token;
            $success['id'] = $user->id;
            $success['faculty_id'] = $faculty_id;
            $success['name'] =  $user->name;

            $success['id'] = $user->id;

            // dd($user->last_login_time);

            if ($user->last_login_time != null) {
                $success['last_login_time'] = $this->timeDifference(Carbon::parse($user->last_login_time));
            } else {
                $success['last_login_time'] = null;
            }

            $user->update([
                'last_login_time' => Carbon::now()
            ]);

            
            if ($request->browser != null || $request->browser != '') {
                $browser = Browser::where('name', $request->browser)->first();
                if ($browser == null) {
                    $browser = Browser::create([
                        'name' => $request->browser,
                        'count' => 1
                    ]);
                }else {
                    $browser->update([
                        'count' => ++$browser->count
                    ]);
                }
            }

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
            'email' => 'required|email',
            'password' => 'required|min:8',
            'faculties' => 'required|array'
        ]);
        $guest = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => 5 //guest role id
            ]);
            foreach ($request->faculties as $faculty) {
                FacultyUser::create([
                    'user_id' => $user->id,
                    'faculty_id' => $faculty
                ]);

                // send email
                $this->sendMailToCoordinator($faculty);
            }
            return $user;
        });
        $token = $guest->createToken('auth_token')->accessToken;
        $success['name'] = $guest->name;
        $success['email'] = $guest->email;
        $success['token'] = $token;
        //welcome message for guest account creation
        //need to ask
        return $this->sendResponse($success, "Guest Registered", 200);
    }

    private function sendMailToCoordinator($facultyId) {

        $coordinator = DB::table('users')
            ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
            ->where('faculty_users.faculty_id', '=', $facultyId)
            ->where('users.role_id', '=', 3)
            ->select(['name', 'email'])
            ->first();

        Mail::mailer('smtp')->send(
            'mail.guest_register', 
            ['name' => $coordinator->name], 
            function($message) use ($coordinator) {
                $message->from(env('MAIL_USERNAME'));
                $message->to($coordinator->email);
                $message->subject('New Guest Registered');
        });
    }

    public function testHash(Request $request) {
        $request->validate([
            'password' => 'required',
        ]);
        return $this->sendResponse(Hash::make($request->password), $request->password, 200);
    }
}
