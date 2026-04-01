# Развёртывание PlantCare-Site

## Публикация на GitHub

### PlantCare (приложение)

```powershell
cd C:\Users\User\Downloads\PlantCare

# Проверить статус
git status

# Добавить изменения
git add .

# Коммит
git commit -m "Добавлен ext_plants.json как дополнительный источник растений"

# Пуш (если remote настроен)
git push origin feature/ui-unification-and-bug-fixes
# или
git push origin master
```

### PlantCare-Site (сайт)

```powershell
cd C:\Users\User\Downloads\ProjectPlantCare\PlantCare-Site

# Проверить статус
git status

# Добавить изменения
git add .

# Коммит
git commit -m "Обновлены APK, улучшен UI, исправлен tech stack, статистика"

# Пуш на GitHub
git push origin main
# или master
git push origin master
```

## Netlify

Сайт настроен на Netlify (`netlify.toml`). После push в GitHub репозиторий PlantCare-Site деплой произойдёт автоматически (если подключён к Netlify).

## Обновление релизов

1. Собрать APK: `cd PlantCare && .\gradlew :app:assembleDebug`
2. Скопировать в Releases:
   ```powershell
   Copy-Item "PlantCare\app\build\outputs\apk\debug\app-debug.apk" "PlantCare-Site\Releases\PlantCare-latest-stable.apk" -Force
   Copy-Item "PlantCare\app\build\outputs\apk\debug\app-debug.apk" "PlantCare-Site\Releases\PlantCare-latest-experimental.apk" -Force
   ```
3. Для Windows: `.\gradlew :desktop:packageReleaseExe :desktop:packageReleaseMsi`
4. Коммит и пуш
