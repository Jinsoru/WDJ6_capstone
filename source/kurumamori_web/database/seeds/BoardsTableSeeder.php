<?php

use Illuminate\Database\Seeder;

class BoardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 2,
            'title' => "업데이트 v0.1 내역입니다.",
            'content' => "
            업데이트 v0.1 내역입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 2,
            'title' => "업데이트 v0.2 내역입니다.",
            'content' => "
            업데이트 v0.2 내역입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 1,
            'title' => "[공지] 여러분 안녕하세요 쿠루마모리119입니다.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 3,
            'category_id' => 3,
            'title' => "제품구매 관련해서 문의드립니다.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 2,
            'category_id' => 4,
            'title' => "업데이트 오류가 있는거 같은데요...",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 2,
            'category_id' => 4,
            'title' => "이거 왜 생기는 건가요?",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 13,
        ]);
        \App\Board::create([
            'user_id' => 2,
            'category_id' => 4,
            'title' => "이거 왜 생기는 건가요?",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 33,
        ]);
        \App\Board::create([
            'user_id' => 4,
            'category_id' => 6,
            'title' => "의료 정보나 보험사 정보 기입에 대해서 질문드립니다.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 23,
        ]);
        \App\Board::create([
            'user_id' => 5,
            'category_id' => 5,
            'title' => "소프트웨어 오류가 있는거 같아요..",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 5,
            'category_id' => 3,
            'title' => "제품 구매 관련 질문드립니다.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 1,
            'title' => "[공지] 여러분 쿠루마모리 119 입니다.",
            'content' => "
                안녕하세요. 쿠루마모리 119 입니다. 
                이렇게 공지사항을 통해서 여러분에게 인사를 드립니다.
                저희 쿠루마모리 119에 많은 관심을 주셔서 그저 감사할 다름입니다.
                저희 서비스는 2020년 06월 29일 부로 서비스를 시작할 예정입니다.
                앞으로 여러분들과 함께 성장해서 더 좋은 쿠루마모리 119로 발전할 수 있도록 노력하겠습니다.
                항상 먼저 고객을 생각하는 고객을 위한 고객에 의한 서비스를 제공하겠습니다.
                앞으로도 더 많이 쿠루마모리 119를 사랑해주세요. 감사합니다.
            ",
            'view_count' => 23,
        ]);
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 7,
            'title' => "업데이트 v0.1 내역입니다.",
            'content' => "
            업데이트 v0.1 내역입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 7,
            'title' => "추천합니다. ",
            'content' => "
            업데이트 v0.2 내역입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 7,
            'title' => "처음 쓸 때는 조금 불편했는데 지금은 완전 만족",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 3,
            'category_id' => 7,
            'title' => "만족스럽습니다. 추천!",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 2,
            'category_id' => 7,
            'title' => "좋아요. ㅎㅎ ",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 2,
            'category_id' => 7,
            'title' => "생각보다 좋은거 같은데요.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 13,
        ]);
        \App\Board::create([
            'user_id' => 2,
            'category_id' => 7,
            'title' => "반신반의 했는데 좋아요.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 33,
        ]);
        \App\Board::create([
            'user_id' => 4,
            'category_id' => 7,
            'title' => "여러분 강력 추천합니다.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 23,
        ]);
        \App\Board::create([
            'user_id' => 5,
            'category_id' => 7,
            'title' => "구매 후기 남깁니다.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 5,
            'category_id' => 7,
            'title' => "사용해보니까 생각보다 좋네요.",
            'content' => "
            [공지] 여러분 안녕하세요 쿠루마모리119입니다.
            ",
            'view_count' => 3,
        ]);
        \App\Board::create([
            'user_id' => 1,
            'category_id' => 7,
            'title' => "사용 후기입니다.",
            'content' => "
                안녕하세요. 쿠루마모리 119 입니다. 
                이렇게 공지사항을 통해서 여러분에게 인사를 드립니다.
                저희 쿠루마모리 119에 많은 관심을 주셔서 그저 감사할 다름입니다.
                저희 서비스는 2020년 06월 29일 부로 서비스를 시작할 예정입니다.
                앞으로 여러분들과 함께 성장해서 더 좋은 쿠루마모리 119로 발전할 수 있도록 노력하겠습니다.
                항상 먼저 고객을 생각하는 고객을 위한 고객에 의한 서비스를 제공하겠습니다.
                앞으로도 더 많이 쿠루마모리 119를 사랑해주세요. 감사합니다.
            ",
            'view_count' => 23,
        ]);
    }
}
