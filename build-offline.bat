@echo off
setlocal
cd /d "%~dp0"

echo.
echo Digitalis tananyagtar - offline valtozat keszitese
echo ================================================
echo.

where python >nul 2>nul
if errorlevel 1 (
  echo HIBA: A Python nem talalhato ezen a gepen.
  echo Telepitsd a Pythont, majd futtasd ujra ezt a fajlt.
  pause
  exit /b 1
)

echo [1/4] Szugseges csomagok ellenorzese...
python -m pip install -r requirements.txt
if errorlevel 1 goto :error

echo.
echo [2/4] Offline weboldal elkeszitese...
python -m mkdocs build -f mkdocs-offline.yml -d offline-site --clean
if errorlevel 1 goto :error

echo.
echo [3/4] Offline belso hivatkozasok javitasa...
python fix-offline-links.py
if errorlevel 1 goto :error

echo.
echo [4/4] Kesz.
echo Az offline oldal itt talalhato:
echo %CD%\offline-site\index.html
echo.
echo Ezt az egesz offline-site mappat atmasolhatod kulso meghajtora.
echo Az index.html fajlt dupla kattintassal nyithatod meg.
echo.
start "" "%CD%\offline-site\index.html"
pause
exit /b 0

:error
echo.
echo HIBA: Az offline oldal elkeszitese nem sikerult.
echo A fenti hibaUzenet segit megkeresni az okat.
pause
exit /b 1
