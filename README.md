# WDJ6_capstone
3WDJ 6조 캡스톤 자료입니다 :)


* WEB SOURCE CODE : https://github.com/nsns0101/laravel_kurumamori
* APP SOURCE CODE : https://github.com/JunHyeok95/reactNative2/tree/master/Proto2
* HW SOURCE CODE : https://github.com/InsikJeong/3WDJ_6

# AWS EC2 Linux 설정
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
<!-- laravel 테스트 -->
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
      외부접속 가능하도록 0.0.0.0
23. mysql -uroot -p
24. sudo composer create-project laravel/laravel Kurumamori --prefer-dist
25. cd /etc/apache2/sites-available/
26. sudo vi 000-default.conf 
      (수정내용은 메모장 참고)
27. cd /var/www/html
28. sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
29. sudo apt-get install -y nodejs
30. node -v    npm -v
31. sudo apt-get install build-essential

<!-- 우리 프로젝트 가져오기 -->
sudo git clone 프로젝트주소 폴더명
sudo composer update
sudo composer install
sudo npm install
mysql -uroot -p
     grant all privileges on *.* to 'root'@'%' identified by '비밀번호';
     create database kurumamori;
     flush privileges;
     exit;
cd /var/www/html/kurumamori
sudo php artisan key:generate 
sudo php artisan migrate:refresh --seed
sudo cp .env.example .env
.env 수정
sudo chmod 777 -R storage
sudo chmod 777 -R bootstrap
sudo service apache2 restart

추후에 모든 소스코드를 통합할 예정입니다!