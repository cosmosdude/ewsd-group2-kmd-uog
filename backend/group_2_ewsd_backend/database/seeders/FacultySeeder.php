<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $existingFaculty = DB::table('falculties')
        ->where('name', 'Administrator')->first();
        // create faculty if it does not exist
        if ($existingFaculty == null) {
            DB::table('falculties')->insert([
                [
                    'name' => 'Administrator',
                    'email' => 'admin@yopmail.com',
                    'phone' => '',
                    'description' => '',
                    'room_no' => '',
                    'building_no' => ''
                ]
            ]);
        }
    }
}
