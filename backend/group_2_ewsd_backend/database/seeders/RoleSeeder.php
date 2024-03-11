<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $table = DB::table('roles');
        if ($table->find(1) == null) {
            $table->insert([
                ['id' => 1, 'name' => 'administrator', 'description' => 'Administrator'],
                ['id' => 2, 'name' => 'm_manager', 'description' => 'Marketing Manager'],
                ['id' => 3, 'name' => 'm_coordinator', 'description' => 'Marketing Coordinator'],
                ['id' => 4, 'name' => 'student', 'description' => 'Student'],
                ['id' => 5, 'name' => 'guest', 'description' => 'Guest']
            ]);
        }
            
    }
}
