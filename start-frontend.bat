@echo off

cd frontend
echo "Current Directory is now in:"
cd
echo.

echo "Installing node packages (3rd party libs)"
call npm install
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

echo Type 'o + Enter' to run the app on browser when server is running
timeout 3
call npm run dev
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

pause