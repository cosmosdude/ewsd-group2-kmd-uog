<?php

use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClosureController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\FalcultyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::post('login', [AuthController::class, 'login']);
// guest user register
Route::post('/guest-register', [AuthController::class, 'guestRegister']);


Route::middleware('auth:api')->group(function () {
    Route::post('/faculties/{id}/guest-user', [FalcultyController::class, 'getGuestUserList']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/closures/current', [ClosureController::class, 'getCurrentClosures']);
    Route::apiResource('/closures', ClosureController::class)->except('destroy');
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::get('/contributions/download/{id}', [ContributionController::class, 'downloadContribution']);

    Route::middleware('role:m_coordinator')->group(function () {
        Route::put('/contributions/status/{id}', [ContributionController::class, 'changeStatus']);
        //accept closure id as a parameter
        Route::get('/closures/{id}/submit', [ClosureController::class, 'getSubmittedContributionsWithinFaculty']);
    });
    Route::middleware('role:student')->group(function () {
        Route::get('/contributions', [ContributionController::class, 'index']);
        Route::get('/contributions/{id}', [ContributionController::class, 'show']);
        Route::post('/contributions', [ContributionController::class, 'store']);
        Route::post('/contributions/update/{id}', [ContributionController::class, 'update']);
        Route::get('/closures/{id}/upload', [ClosureController::class, 'viewUploadContributionofStudent']);
        // Route::apiResource('/contributions', ContributionController::class )->except('show','destroy');
        Route::get('contributionlist', [ContributionController::class, 'index']);
    });
    Route::middleware(['role:m_coordinator,student'])->group(function () {
        Route::post('/comments', [CommentController::class, 'store']);
    });

    Route::middleware(['role:administrator,m_coordinator'])->group(function () {

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

    });

    Route::middleware('role:m_manager')->group(function () {
        Route::post('/closures/{id}/download', [ClosureController::class, 'downloadApprovedContributions']);
    });
});
Route::post('/academicyear', [AcademicYearController::class, 'store']);
Route::put('/academicyearupdate/{id}', [AcademicYearController::class, 'update']);
