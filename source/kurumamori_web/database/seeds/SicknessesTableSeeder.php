<?php

use Illuminate\Database\Seeder;

class SicknessesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Sickness::class, 20)->create();
    }
}
