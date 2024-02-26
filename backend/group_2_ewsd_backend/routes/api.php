<?php

use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClosureController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\FalcultyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('login', [AuthController::class, 'login']);
// guest user register
Route::post('/guest-register', [AuthController::class, 'guestRegister']);


Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/closures/current', [ClosureController::class, 'getCurrentClosures']);
    Route::apiResource('/closures', ClosureController::class)->except('destroy');
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('users/{id}', [UserController::class, 'show']);

    Route::middleware('role:m_coordinator')->group(function () {
        Route::put('/contributions/staus/{id}', [ContributionController::class, 'changeStatus']);
        //accept closure id as a parameter
        Route::get('/closures/{id}/submit', [ClosureController::class, 'getSubmittedContributionsWithinFaculty']);
    });

    Route::middleware('role:student')->group(function () {
        Route::post('/contributions', [ContributionController::class, 'store']);
    });

    Route::middleware('role:administrator')->group(function () {
        //in most of the LMS, update student information only done by the admin
        Route::apiResource('users', UserController::class)->except('show', 'destroy', 'store');
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/faculties', [FalcultyController::class, 'store']);
        Route::apiResource('/academic-years', AcademicYearController::class)->except('update', 'destroy', 'store');
    });

    Route::middleware('role:m_manager')->group(function () {
        Route::post('/closures/{id}/download', [ClosureController::class, 'downloadApprovedContributions']);
    });
});
