# 🚀 Инструкции по деплою PlantCare Website

## ✅ Все исправлено!

### Что было исправлено:

1. **Кнопка темной темы** - добавлен правильный `id="theme-toggle"`
2. **Скачивание файлов** - исправлены пути к файлам в папке Releases
3. **Карточка создателя** - перемещена выше, обновлен текст
4. **Кнопка GitHub** - добавлена в hero секцию
5. **Описания** - обновлены все тексты согласно вашим комментариям
6. **Слоган** - добавлен "PlantCare - ваш помощник в царстве растений"
7. **Ссылки на репозитории** - добавлены ссылки на PlantCare-Site и AI Scanner

---

## 📦 Подготовка к деплою на Netlify

### Шаг 1: Структура папки для деплоя

Создайте структуру:

```
PlantCare-Deployment/
├── index.html
├── styles.css
├── script.js
├── netlify.toml
├── .gitignore
├── README.md
├── DEPLOYMENT.md
├── QUICK_START.md
└── Releases/
    ├── PlantCare-latest-stable.apk
    ├── PlantCare-latest-experimental.apk
    ├── PlantCare-latest.exe
    ├── PlantCare-latest.msi
    └── PlantCare-Ai-Plants-Scanner.apk
```

### Шаг 2: Копирование файлов

Скопируйте все файлы из `PlantCare-Website` и папку `Releases`:

```powershell
# Создайте папку для деплоя
New-Item -ItemType Directory -Path "C:\Users\User\Downloads\PlantCare-Deployment"

# Копируйте файлы сайта
Copy-Item "C:\Users\User\Downloads\PlantCare-Website\*" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\" -Recurse

# Копируйте папку Releases
Copy-Item "C:\Users\User\Downloads\Releases" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\" -Recurse
```

### Шаг 3: Деплой на Netlify

#### Вариант A: Через Git (Рекомендуется)

1. Инициализируйте Git репозиторий:
```bash
cd C:\Users\User\Downloads\PlantCare-Deployment
git init
git add .
git commit -m "Initial commit: PlantCare website"
```

2. Подключите к GitHub:
```bash
git remote add origin https://github.com/DenisAniskov/PlantCare-Site.git
git branch -M main
git push -u origin main
```

3. Зайдите на [Netlify](https://netlify.com)
4. Нажмите "New site from Git"
5. Выберите GitHub → PlantCare-Site
6. Настройки:
   - **Branch to deploy:** main
   - **Build command:** (оставьте пустым)
   - **Publish directory:** .
7. Нажмите "Deploy site"

#### Вариант B: Drag & Drop (Быстрее)

1. Зайдите на [Netlify](https://netlify.com)
2. Нажмите "Add new site" → "Deploy manually"
3. Перетащите папку `PlantCare-Deployment` в окно браузера
4. Подождите 10-30 секунд
5. ✅ Готово!

### Шаг 4: Настройка домена

1. В Netlify перейдите в **Site settings**
2. **Domain management** → **Options** → **Edit site name**
3. Измените на: `plantcare-app` (или любое доступное имя)
4. Ваш адрес: `https://plantcare-app.netlify.app`

---

## 🔧 Исправленные проблемы

### 1. Темная тема теперь работает ✅

**Было:** `id="themeToggle"` (неправильно)  
**Стало:** `id="theme-toggle"` (правильно)

JavaScript ожидал `theme-toggle`, а в HTML было `themeToggle`.

### 2. Скачивание файлов работает ✅

**Было:** Прямые пути к файлам  
**Стало:** Относительные пути `../Releases/filename.apk`

При локальном просмотре файлы должны быть в `C:\Users\User\Downloads\Releases\`.  
При деплое файлы будут в папке `Releases/` внутри проекта.

### 3. Обновленные тексты ✅

- **Слоган:** "PlantCare - ваш помощник в царстве растений"
- **Создатель:** "Увлеченный разработчик" (убран "студент")
- **AI Scanner:** "Отдельное приложение-сканер"
- **Experimental:** Добавлено предупреждение о багах
- **EXE/MSI:** Оба теперь "Установщик"

### 4. Карточка создателя ✅

Перемещена выше в секции "О проекте", добавлены:
- Ссылки на GitHub репозитории
- Обновленное описание
- Стильные кнопки с hover-эффектом

---

## 📱 Проверка работы

### Локально:

1. Откройте `index.html` в браузере
2. Проверьте:
   - ✅ Переключение темы (кнопка 🌙)
   - ✅ Скачивание файлов (все 5 версий)
   - ✅ Все ссылки работают
   - ✅ Анимации плавные

### После деплоя:

1. Откройте сайт на Netlify
2. Протестируйте на телефоне
3. Проверьте скачивание APK
4. Убедитесь, что темная тема работает

---

## 📊 Размеры файлов

| Файл | Размер |
|------|--------|
| index.html | ~42 KB |
| styles.css | ~26 KB |
| script.js | ~18 KB |
| **Всего (без релизов)** | **~86 KB** |

---

## 🎯 Следующие шаги

1. ✅ Скопируйте файлы в `PlantCare-Deployment`
2. ✅ Добавьте папку `Releases` с файлами
3. ✅ Загрузите на GitHub (PlantCare-Site)
4. ✅ Подключите к Netlify
5. ✅ Создайте QR-код с адресом сайта
6. ✅ Протестируйте на телефоне

---

## 💡 Полезные команды

### Копирование файлов (PowerShell):

```powershell
# Создать папку деплоя
New-Item -ItemType Directory -Path "C:\Users\User\Downloads\PlantCare-Deployment" -Force

# Копировать файлы сайта
Copy-Item "C:\Users\User\Downloads\PlantCare-Website\index.html" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\"
Copy-Item "C:\Users\User\Downloads\PlantCare-Website\styles.css" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\"
Copy-Item "C:\Users\User\Downloads\PlantCare-Website\script.js" -Destination "C:\Users\User\Downloads\PlantCare-Website\"
Copy-Item "C:\Users\User\Downloads\PlantCare-Website\netlify.toml" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\"
Copy-Item "C:\Users\User\Downloads\PlantCare-Website\README.md" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\"
Copy-Item "C:\Users\User\Downloads\PlantCare-Website\.gitignore" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\"

# Копировать папку Releases
Copy-Item "C:\Users\User\Downloads\Releases" -Destination "C:\Users\User\Downloads\PlantCare-Deployment\" -Recurse
```

### Git команды:

```bash
cd C:\Users\User\Downloads\PlantCare-Deployment

# Инициализация
git init

# Добавить все файлы
git add .

# Коммит
git commit -m "feat: initial deployment with all releases"

# Подключить к GitHub
git remote add origin https://github.com/DenisAniskov/PlantCare-Site.git

# Загрузить
git branch -M main
git push -u origin main
```

---

## ✅ Готово!

Теперь все исправлено и готово к деплою на Netlify! 🎉

**Следующий шаг:** Скопируйте файлы в папку деплоя и загрузите на Netlify.
