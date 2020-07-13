<?php

use Illuminate\Database\Seeder;

class InsurancesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Insurance::class, 11)->create();
    }
}
