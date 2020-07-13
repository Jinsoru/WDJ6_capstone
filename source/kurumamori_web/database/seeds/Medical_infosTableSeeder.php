<?php

use Illuminate\Database\Seeder;

class Medical_infosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Medical_info::class, 11)->create();
    }
}
