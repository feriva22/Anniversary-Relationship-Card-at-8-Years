@echo off
title Server Website 8 Tahun - Ferico ^& Yohana
cd /d "%~dp0"
echo ============================================
echo   Website 8 Tahun - Ferico ^& Yohana
echo ============================================
echo.
echo   Menyalakan server lokal...
echo.
echo   Buka di browser:  http://localhost:8099
echo.
echo   Tekan Ctrl + C untuk mematikan server.
echo ============================================
echo.

start "" "http://localhost:8099"

python -m http.server 8099
if errorlevel 1 (
  echo.
  echo Python gagal, mencoba Node...
  npx --yes serve -l 8099 .
)

pause
