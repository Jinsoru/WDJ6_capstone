<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $category = ["공지사항", "업데이트", "제품구매", "제품오류", "소프트웨어", "기타문의", "유저리뷰"];
        for ($i = 0; $i < count($category); $i++) {
            App\Category::create(
                [
                    'category' => $category[$i],
                    ]
            );
        }
    }
}
