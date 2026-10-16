@echo off
title Design Destiny - Local Preview
cd /d "%~dp0"
echo.
echo   ============================================
echo    Design Destiny - Portfolio (local preview)
echo   ============================================
echo.
echo   Starting the site... it will open in your
echo   browser at http://localhost:5173
echo.
echo   Keep this window OPEN while viewing.
echo   Press Ctrl+C to stop the site.
echo.
call npm run dev -- --port 5173 --open
pause
