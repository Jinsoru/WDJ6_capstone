<?php

use Illuminate\Database\Seeder;

class Insurance_listsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $insurance_name = ["하나보험사", "우리보험사", "준혁보험사", "동화보험사"];
        for($i = 0; $i < count($insurance_name); $i++){
            App\Insurance_list::create(
                [
                    'insurance_name' => $insurance_name[$i],
                    'insurance_phone' => '010-' . rand(1000, 9999) . '-' . rand(1000, 9999),
                ]
                );
        }
    }
}
