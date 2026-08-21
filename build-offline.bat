@echo off
setlocal
cd /d "%~dp0"

echo.
echo Digitális tananyagtár - offline változat készítése
echo ================================================
echo.

where python >nul 2>nul
if errorlevel 1 (
  echo HIBA: A Python nem található ezen a gépen.
  echo Telepítsd a Pythont, majd futtasd újra ezt a fájlt.
  pause
  exit /b 1
)

echo [1/3] Szükséges csomagok ellenőrzése...
python -m pip install -r requirements.txt
if errorlevel 1 goto :error

echo.
echo [2/3] Offline weboldal elkészítése...
python -m mkdocs build -f mkdocs-offline.yml -d offline-site --clean
if errorlevel 1 goto :error

echo.
echo [3/3] Kész.
echo Az offline oldal itt található:
echo %CD%\offline-site\index.html
echo.
echo Ezt az egész offline-site mappát átmásolhatod külső meghajtóra.
echo Az index.html fájlt dupla kattintással nyithatod meg.
echo.
start "" "%CD%\offline-site\index.html"
pause
exit /b 0

:error
echo.
echo HIBA: Az offline oldal elkészítése nem sikerült.
echo A fenti hibaüzenet segít megkeresni az okát.
pause
exit /b 1
