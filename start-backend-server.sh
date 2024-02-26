clear
echo "[ewsd]: Currently in '$PWD'"
sleep 0.1
echo "[ewsd]: Going to backend directory ..."
sleep 0.1
cd 'backend/group_2_ewsd_backend'
sleep 0.1
echo "[ewsd]: Now in '$PWD'"
sleep 0.1
echo ""
echo "[ewsd]: Installing composer vendor files..."
sleep 1
composer install --verbose
echo "[ewsd]: Composer Install [DONE]"

echo "[ewsd]: Migrating database ..."
sleep 0.1
php artisan migrate
sleep 0.25
php artisan migrate:status
echo "[ewsd]: Database migration done"

sleep 0.5

echo "[ewsd]: Clearing routes ..."
sleep 0.1
php artisan route:cache

echo "[ewsd]: Starting backend server ..."
sleep 1
php artisan serve