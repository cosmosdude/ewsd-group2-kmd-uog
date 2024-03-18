@echo off

cd backend\\group_2_ewsd_backend
echo Current Directory is now in:
cd
echo.

echo If any server is running on 127.0.0.1:8000, please stop them
echo Otherwise, this command will hang waiting for the port to relinquish.
echo Have you stopped?
pause
echo Running server
call php artisan serve
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

pause