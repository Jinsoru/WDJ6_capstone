<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot()
    {
        $this->registerPolicies();

        Gate::define('board_update', function($user, $model){
            if($user->id ==3){
                return true;
            }
            else{
                return $user->id === $model->user_id;
            }
        });
        Gate::define('board_delete', function($user, $model){
            if($user->id ==3){
                return true;
            }
            else{
                return $user->id === $model->user_id;
            }
        });
        Gate::define('comment_update', function($user, $model){
            if($user->id ==3){
                return true;
            }
            else{
                return $user->id === $model->user_id;
            }
        });
        Gate::define('comment_delete', function($user, $model){
            if($user->id ==3){
                return true;
            }
            else{
                return $user->id === $model->user_id;
            }
        });
        Gate::define('master', function($user, $model){
            if($user->id ==3){
                return true;
            }
            else{
                return false;
            }
        });
    }
}
