<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
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
        $admin = $usersTable->where('name', 'admin')->first();

        // if it does not exist
        if ($admin == null) {
            $adminId = $usersTable
            ->insertGetId(
                [
                    'name' => 'admin', 
                    'email' => 'admin@yopmail.com',
                    'password' => Hash::make("abcd1234"),
                    'role_id' => 1
                ]
            );
    
            DB::table('faculty_users')->insert([
                ['user_id' => $adminId, 'faculty_id' => $faculty->id]
            ]);
        } else {
            $usersTable->where('email', 'admin@yopmail.com')
            ->update(['password' => Hash::make("abcd1234")]);
        }

        

        
        // DB::table('faculty_users')
        // ->insert([
        //     [
        //         'user_id': 1,
        //     ]
        // ]);
    }
}
