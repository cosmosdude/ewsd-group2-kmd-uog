<?php

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

    //the following route should only access by marketing coordinator
    Route::put('/contributions/staus/{id}', [ContributionController::class, 'changeStatus']);

    Route::middleware('role:student')->group(function () {
        Route::post('/contributions', [ContributionController::class, 'store']);
    });
    Route::middleware(['role:administrator', 'role:student', 'role:m_manager', 'role:m_coordinator'])->group(function () {
        Route::get('users/{id}', [UserController::class, 'show']);
    });


    Route::middleware('role:administrator')->group(function () {
        //in most of the LMS, update student information only done by the admin
        Route::apiResource('users', UserController::class)->except('show', 'destroy', 'store');
        Route::post('/register', [AuthController::class, 'register']);
    });
});

//falculty
Route::post('falcultycreate', [FalcultyController::class, 'create']);
