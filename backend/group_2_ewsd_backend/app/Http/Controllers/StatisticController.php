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

    public function getMagazineCommentStatuses(Request $request) {
        $magazineId = $request->query('magazine_id');

        $uncommented = $this->uncommentedCount($magazineId)[0]->count;
        $commented = $this->commentedCount($magazineId)[0]->count;
        $overdue = $this->overdueCount($magazineId)[0]->count;
        return $this->sendResponse([
            "uncommented" => $uncommented,
            "commented" => $commented,
            "overdue" => $overdue,
        ], "Ok, 200");
    }

    private function uncommentedCount($magazineId) {
        $contributions = DB::table('closures')
            ->join('contributions', 'contributions.closure_id', '=', 'closures.id')
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->select(DB::raw('COUNT(contributions.id) as count'))
            ->where('contributions.is_commented', 0)
            ->where('closures.id', $magazineId)
            ->get();

        return $contributions;
    }

    private function commentedCount($magazineId) {
        $contributions = DB::table('closures')
            ->join('contributions', 'contributions.closure_id', '=', 'closures.id')
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->select(DB::raw('COUNT(contributions.id) as count'))
            ->where('contributions.is_commented', 1)
            ->where('closures.id', $magazineId)
            ->get();

        return $contributions;
    }

    private function overdueCount($magazineId) {
        $contributions = DB::table('closures')
            ->join('contributions', 'contributions.closure_id', '=', 'closures.id')
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users', 'faculty_users.user_id', '=', 'users.id')
            ->join('falculties', 'faculty_users.faculty_id', '=', 'falculties.id')
            ->select(DB::raw('COUNT(contributions.id) as count'))
            ->where('contributions.is_commented', 0)
            ->where(DB::raw('DATEDIFF(contributions.created_at, CURRENT_TIMESTAMP()) >= 14'))
            ->where('closures.id', $magazineId)
            ->get();

        return $contributions;
    }

}
