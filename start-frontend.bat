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

call npm run dev
if %errorlevel% gtr 0 (
    pause 
    exit
)
echo.

pause