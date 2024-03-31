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

    public function mostReadContributions() 
    {
        $contributions = DB::table('contributions')
            ->orderBy('read_count', 'desc')
            ->limit(5)
            ->select('id', 'name', 'read_count')
            ->get();
        return $this->sendResponse($contributions, "test", 200);
    }

    public function getMagazineCommentStatuses(Request $request) 
    {
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

    public function contributionsAndContributors(Request $request) 
    {
        $academic_id = $request->query('academic_id');

        // $contributions = DB::table('contributions')
        //     ->join('closures', 'contributions.closure_id', '=', 'closures.id')
        //     ->join('users', 'users.id', '=', 'contributions.user_id')
        //     // ->join('faculty_users as fu', 'fu.user_id')
        //     // ->join('falculties as f', 'f.id', '=', '')
        //     ->where('closures.academic_id', '=', $academic_id)
        //     ->select()
        //     // ->select(DB::raw("COUNT(*) as count"))
        //     ->get();

        $contributions = DB::table('contributions')
            ->join('users', 'users.id', '=', 'contributions.user_id')
            ->join('faculty_users as fu', 'fu.user_id', '=', 'users.id')
            ->join('falculties as f', 'f.id', '=', 'fu.faculty_id')
            ->select(['f.name as faculty_name', DB::raw('count(f.id) as contribution_count')])
            ->groupBy('f.id')
            ->get();

        /*
        select 
        f.name as faculty_name, COUNT(f.id) as contribution_count
        from contributions
        join users on users.id=contributions.user_id
        join faculty_users as fu on fu.user_id=users.id
        join falculties as f on f.id=fu.faculty_id
        group by f.id;
        */

        $users = DB::table('contributions')
            ->join('closures', 'contributions.closure_id', '=', 'closures.id')
            ->where('closures.academic_id', '=', $academic_id)
            ->select(DB::raw("COUNT(user_id) as count"))
            ->groupBy('user_id')
            ->get()[0]->count;

        return $this->sendResponse(
            [
                "contribution_count" => $contributions,
                "contributor_count" => $users,
            ], 
            "OK", 200
        );
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
