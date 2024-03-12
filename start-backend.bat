@echo off

cd backend\\group_2_ewsd_backend
echo "Current Directory is now in:"
cd
echo.

echo "Installing vendor files (3rd party libs) [Just in case]"
call php artisan serve
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

pause