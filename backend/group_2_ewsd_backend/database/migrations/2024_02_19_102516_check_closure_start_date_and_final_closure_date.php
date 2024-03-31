<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $query = "
            CREATE PROCEDURE `check_closure_date` ()
            BEGIN
                SELECT *
                FROM closures
                WHERE start_date <= CURDATE()
                AND final_closure_date >= CURDATE();
            END
        ";

        DB::unprepared($query);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $query = "DROP PROCEDURE IF EXISTS `check_closure_date`";

        DB::unprepared($query);
    }
};
