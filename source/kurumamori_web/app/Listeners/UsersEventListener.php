<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UsersEventListener
{
    public function __construct()
    {
        //
    }

    public function handle(Login $event)
    {
        //
    }

    # 이벤트 구독
    public function subscribe(\Illuminate\Events\Dispatcher $events)
    {
        # 코드 23-16 유저 생성
        $events->listen(
            \App\Events\UserCreated::class,
            # 현재 클래스의 콜백을 등록
            __CLASS__ . '@onUserCreated'
        );
        # 코드 23-30 유저 비밀번호 초기화
        $events->listen(
            \App\Events\PasswordRemindCreated::class,
            __CLASS__ . '@onPasswordRemindCreated'
        );
    }

    # 코드 23-16 유저 생성 관련 메서드
    public function onUserCreated(\App\Events\UserCreated $event)
    {
        $user = $event->user;
        \Mail::send( # view, 정보, 콜백을 보낸다
            'users.partial.email',
            compact('user'),
            function ($message) use ($user) {
                $message->to($user->email);
                $message->subject(
                    sprintf('[%s] 회원 가입을 확인해주세요.', config('app.name'))
                );
            }
        );
    }

    # 코드 23-30 유저 비밀번호 초기화 관련 메서드
    public function onPasswordRemindCreated(\App\Events\PasswordRemindCreated $event)
    {
        \Mail::send(
            'emails.passwords.reset',
            ['token' => $event->token],
            function ($message) use ($event) {
                $message->to($event->email);
                $message->subject(
                    sprintf('[%s] 비밀번호를 초기화하세요.')
                );
            }
        );
    }
}
