@echo off
cd /d "%~dp0"
echo === PlantCare-Site ===
git add Releases/ index.html script.js
git status
git commit -m "chore: v0.1.1 - APK, EXE, MSI с fallback бэкендом"
git push origin main
pause
