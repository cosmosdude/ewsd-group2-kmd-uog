<?php

use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClosureController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\FalcultyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// new -> $2y$10$KwhI0zkcUV/wGOJ3J2a31eXyp/EAGsw18WWxAJfXc885IBaC9wCSG


Route::post('login', [AuthController::class, 'login']);
Route::post('hash', [AuthController::class, 'testHash']);
// guest user register
Route::post('/guest-register', [AuthController::class, 'guestRegister']);
Route::apiResource('faculties', FalcultyController::class)->except('show', 'destroy');

Route::middleware('auth:api')->group(function () {
    Route::get('userlist', [ContributionController::class, 'getMostActiveUserList']);
    Route::get('studentlist', [ContributionController::class, 'getMostlyUploadContribution']);
    Route::post('contributionsbyfaculty', [ContributionController::class, 'getPieChartforAdmin']);

    Route::post('/selected-contributions', [ContributionController::class, 'getAllSelectedContributions']);
    Route::post('contributionlist', [ContributionController::class, 'filter']);

    Route::get('/contributions', [ContributionController::class, 'index']);
    Route::get('/contributions/{id}', [ContributionController::class, 'show']);

    Route::post('/faculties/{id}/guest-user', [FalcultyController::class, 'getGuestUserList']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/closures/current', [ClosureController::class, 'getCurrentClosures']);
    Route::apiResource('/closures', ClosureController::class)->except('destroy');
    Route::get('/previous-closures', [ClosureController::class, 'getPreviousClosures']); //previous closure list

    Route::get('/me', [AuthController::class, 'me']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::get('/contributions/download/{id}', [ContributionController::class, 'downloadContribution']);


    Route::middleware('role:m_coordinator')->group(function () {
        Route::put('/contributions/status/{id}', [ContributionController::class, 'changeStatus']);
        //accept closure id as a parameter
        Route::get('/closures/{id}/submit', [ClosureController::class, 'getSubmittedContributionsWithinFaculty']);
        //get current closure of contribution list
        Route::get('/contributionlist', [ContributionController::class, 'getCurrentClosureContributionList']);

    });

    Route::middleware('role:student')->group(function () {
        //index function
        Route::get('/contributions/{id}', [ContributionController::class, 'show']);
        Route::post('/contributions', [ContributionController::class, 'store']);
        Route::post('/contributions/update/{id}', [ContributionController::class, 'update']);
        Route::get('/closures/{id}/upload', [ClosureController::class, 'viewUploadContributionofStudent']);
        Route::apiResource('/contributions', ContributionController::class )->except('show','destroy');
        Route::get('contributionlist', [ContributionController::class, 'UploadedContributionList']);
        //contribution and comment count list
        Route::get('/contributions', [ContributionController::class, 'index']);
    });

    Route::middleware('role:guest')->group(function () {
        Route::post('/guest/faculty-register', [UserController::class, 'registerFacultyByGuest']);
        Route::get('/guest/unregistered-faculty/{id}', [UserController::class, 'getUnregisteredFacultyOfGuest']);
    });

    Route::middleware('role:student')->group(function () {
        Route::post('/contributions', [ContributionController::class, 'store']);
        Route::post('/contributions/update/{id}', [ContributionController::class, 'update']);
        Route::get('/closures/{id}/upload', [ClosureController::class, 'viewUploadContributionofStudent']);
        Route::apiResource('/contributions', ContributionController::class)->except('index', 'show', 'destroy');
        Route::get('contributionlist', [ContributionController::class, 'UploadedContributionList']);
        //contribution and comment count list
        Route::get('/contributions', [ContributionController::class, 'index']);
    });
    Route::middleware('role:m_coordinator,student')->group(function () {
        Route::post('/comments', [CommentController::class, 'store']);
        Route::post('/contributions/all', [ContributionController::class, 'getAllContributionsByCoordinatorAndStudent']);
    });

    Route::middleware('role:administrator')->group(function () {
        //in most of the LMS, update student information only done by the admin
        Route::apiResource('users', UserController::class)->except('show', 'destroy', 'store');
        Route::post('/register', [AuthController::class, 'register']);
        Route::apiResource('faculties', FalcultyController::class)->except('show', 'destroy');
        Route::apiResource('/academic-years', AcademicYearController::class)->except('update', 'destroy', 'store');
        Route::post('/student-register', [AuthController::class, 'studentRegister']);

        Route::post('/faculties', [FalcultyController::class, 'store']);
        //academic_year
        Route::post('/academicyear', [AcademicYearController::class, 'store']);
        Route::put('/academicyearupdate/{id}', [AcademicYearController::class, 'update']);

    });

    Route::middleware(['role:administrator,m_coordinator'])->group(function () {
        Route::post('/students/search', [UserController::class, 'searchStudent']);
        Route::get('/users/roles/students', [UserController::class, 'getStudentList']);
    });
    Route::middleware(['role:administrator,m_coordinator,student,m_manager'])->group(function () {
        Route::get('/faculties/{id}', [FalcultyController::class, 'show']);

    });
    Route::middleware('role:administrator')->group(function () {
        //in most of the LMS, update student information only done by the admin
        Route::apiResource('users', UserController::class)->except('show', 'destroy', 'store');
        Route::post('/register', [AuthController::class, 'register']);
        Route::apiResource('/academic-years', AcademicYearController::class)->except('update', 'destroy', 'store');
        Route::post('/student-register', [AuthController::class, 'studentRegister']);
        // Route::post('/faculties', [FalcultyController::class, 'store']);
        //academic_year
        Route::post('/academicyear', [AcademicYearController::class, 'store']);
        Route::put('/academicyearupdate/{id}', [AcademicYearController::class, 'update']);


        Route::get('upcoming-closures', [ClosureController::class, 'upcomingClosure']);
    });

    Route::middleware('role:m_manager')->group(function () {
        Route::post('/closures/{id}/download', [ClosureController::class, 'downloadApprovedContributions']);
    });
});




