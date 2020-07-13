<?php

use Illuminate\Database\Seeder;

class Drive_detectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Drive_detection::class, 500)->create();
    }
}
