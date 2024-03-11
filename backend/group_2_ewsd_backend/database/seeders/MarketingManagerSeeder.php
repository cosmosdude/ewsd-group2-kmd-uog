<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class MarketingManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faculty = DB::table('falculties')
        ->where('name', 'Administrator')->first();

        if ($faculty == null) return;

        $usersTable = DB::table('users');

        // get admin
        $admin = $usersTable->where('name', 'manager')->first();

        // if it does not exist
        if ($admin == null) {
            $insertId = $usersTable
            ->insertGetId(
                [
                    'name' => 'Marketing Manager', 
                    'email' => 'manager@yopmail.com',
                    'password' => Hash::make("abcd1234"),
                    'role_id' => 2
                ]
            );
    
            DB::table('faculty_users')->insert([
                ['user_id' => $insertId, 'faculty_id' => $faculty->id]
            ]);
        } else {
            $usersTable->where('email', 'manager@yopmail.com')
            ->update(['password' => Hash::make("abcd1234")]);
        }
    }
}
