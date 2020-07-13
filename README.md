# WDJ6_capstone
3WDJ 6조 캡스톤 자료입니다 :)


* WEB SOURCE CODE : https://github.com/nsns0101/laravel_kurumamori
* APP SOURCE CODE : https://github.com/JunHyeok95/reactNative2/tree/master/Proto2
* HW SOURCE CODE : https://github.com/InsikJeong/3WDJ_6


# AWS EC2 Linux 설정 가이드
1. sudo apt-get update
2. sudo apt-get upgrade
3. sudo apt-get install apache2
4. sudo apt-get install php
5. sudo apt-get install libapache2-mod-php
6. sudo apt-get install php-mbstring
7. sudo apt-get install php-xmlrpc
8. sudo apt-get install php-xml
9. sudo apt-get install php-mysql
10. sudo apt-get install php-cli
11. sudo apt install mysql-server
12. cd /var/www/html/
#### laravel 테스트
13. sudo curl -O https://getcomposer.org/composer.phar
14. sudo mv composer.phar composer
15. sudo chmod +x composer
16. sudo mv composer /usr/local/bin
17. sudo apt-get install zip unzip
18. sudo mysql
19. SELECT user,authentication_string,plugin,host FROM mysql.user;
20. ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '비밀번호';
21. FLUSH PRIVILEGES;
22. exit;
      cd /etc/mysql/mysql.conf.d
      sudo vi mysqld.cnf
      외부접속 가능하도록 0.0.0.0으로 수정
23. mysql -uroot -p
24. exit;

### 우리 프로젝트 가져오기
1. sudo git clone 프로젝트주소 폴더명
2. sudo composer update
3. sudo composer install
4. sudo npm install
5. mysql -uroot -p
#### mysql 설정 변경
6. grant all privileges on *.* to 'root'@'%' identified by '비밀번호';
7. create database kurumamori;
8. flush privileges;
9. exit;
10. cd /var/www/html/폴더명
11. sudo php artisan key:generate 
12. sudo php artisan migrate:refresh --seed
13. sudo cp .env.example .env
14. .env 수정
15. cd /etc/apache2/sites-available/
16. sudo vi 000-default.conf 
#### 000-default.conf 수정
```
DocumentRoot /var/www/폴더명/public
<Directory "/var/www/폴더명/public">
     Options Indexes FollowSymLinks MultiViews
     AllowOverride All
     Order allow,deny
     allow from all
</Directory>
```
#### .htaccess 파일 수정
17. sudo vim /var/www/폴더명/public/.htaccess
```
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>
DirectoryIndex index.html index.php
RewriteEngine On
# Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
# Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]
# Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```
18. cd /var/www/html
19. sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
20. sudo apt-get install -y nodejs
21. node -v    npm -v
22. sudo apt-get install build-essential
#### 각 폴더의 접근권한 부여
23. sudo chmod 777 -R storage
24. sudo chmod 777 -R bootstrap
25. sudo service apache2 restart