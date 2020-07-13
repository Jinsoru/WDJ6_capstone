<?php

use Illuminate\Database\Seeder;

class DrivesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Drive::class, 100)->create();
    }
}
