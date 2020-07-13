# > Kurumamori9 Project <
![yju ac kr](https://user-images.githubusercontent.com/48374069/70375447-36bac580-1941-11ea-9cb3-1b2505947fa7.jpg)

## 1. git bash
- $ git clone https://github.com/nsns0101/laravel_kurumamori.git
- $ cd laravel_kurumamori
- $ cp .env.example .env

- $ composer update
- $ composer install
- $ npm install
- api key는 이재영에게 문의할 것

## 2. mysql
- mysql> drop database kurumamori;
- mysql> create database kurumamori;

## 3. .env 파일 수정 [ 다운받은 wdj6 폴더 ]
- DB_DATABASE= [ kurumamori ]
- DB_USERNAME= [ root ]
- DB_PASSWORD= [ password ]


## 4. 실행 

- php artisan key:generate
- php artisan migrate:refresh --seed
- php artisan serve

