<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticController extends Controller
{
    public function index() {

    }

    public function mostReadContributions() {
        $contributions = DB::table('contributions')
            ->orderBy('read_count', 'desc')
            ->limit(5)
            ->select('id', 'name', 'read_count')
            ->get();
        return $this->sendResponse($contributions, "test", 200);
    }
}
