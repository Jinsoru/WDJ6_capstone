<?php

use Illuminate\Database\Seeder;

class Product_buysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Product_buy::class, 30)->create();
    }
}
