@echo off

::
:: check php
::

echo Minimum PHP version required: 8.0.0
echo Found:
:: php is not a bat file but just to be sure, `call` is used here for convention.
call php --version
if %errorlevel% gtr 0 (
    echo "php" needs to be set in environment variable
    pause
    exit
)
echo.

::
:: check composer
::

echo Minimum Composer version required:
echo Found:
:: composer is a bat file
:: need to execute with `call` otherwise the bat file will exit immediately
:: after this piece of crap call
call composer --version

if %errorlevel% gtr 0 (
    echo "composer" needs to be installed
    pause
    exit
)
echo.

cd backend\\group_2_ewsd_backend

echo "Current Directory is now in:"
cd
echo.

echo "Installing vendor files (3rd party libs)"
call composer install
if %errorlevel% gtr 0 (
    echo Please uncomment 'extension=sodium' in 'php.ini'
    echo Please uncomment 'extension=pdo_mysql' in 'php.ini'
    pause 
    exit
)
echo.

echo Creating ".env" file
if exist .env (
    echo `.env` file already exists. Skipping...
) else (
    copy .env.example .env
    echo .env file created
)
echo.

echo "Migrating database"
call php artisan migrate
if %errorlevel% gtr 0 (
    echo Please uncomment 'extension=pdo_mysql' in php.ini
    pause 
    exit
)
echo.

echo "Generating application key"
call php artisan key:generate
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

echo "Installing passport public & private encryption keys"
call php artisan passport:install
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

echo "Seeding database"
call php artisan db:seed
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

echo "Setup [done]"
echo.

echo "Ctrl+C or close the window to end the setup."
pause