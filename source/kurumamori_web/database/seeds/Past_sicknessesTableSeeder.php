<?php

use Illuminate\Database\Seeder;

class Past_sicknessesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Past_sickness::class, 20)->create();
    }
}
