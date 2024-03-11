cd 'backend/group_2_ewsd_backend'
cp '.env.example' '.env'
sed -i '' "s/DB_DATABASE=laravel/DB_DATABASE=uog_kmd_comp_1640_ewsd_group_2/g" .env
composer install
php artisan migrate
php artisan passport:install
php artisan key:generate
php artisan db:seed