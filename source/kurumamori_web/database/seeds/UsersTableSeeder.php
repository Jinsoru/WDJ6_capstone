<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //슈퍼계정
        $name = ["이재영", "장준혁", "김도형", "팽진솔", "예준현", "정인식"];
        $email = [
            "dl@wodud",
            "wkd@wnsgur",
            "rla@ehgud",
            "vod@wlsthf",
            "dP@wnsgus",
            "wjd@dlstlr",
        ];
        $age = [24, 26, 24, 23, 24, 26];
        for ($i = 0; $i < count($name); $i++) {
            App\User::create([
                    'email' => $email[$i],
                    'password' => bcrypt('password'),
                    'name' => $name[$i],
                    'birth' => rand(1960, 2005) . '/' . rand(1,12) . '/' . rand(1,28),
                    'gender' => Arr::random(['남', '여']),
                    'phone' => "010-1234-567{$i}",
                    'confirm_code' => null,
                    // 'remember_token' => Str::random(10),
            ]);
        }
        //일반계정



        factory(App\User::class, 5)->create();
    }

}
