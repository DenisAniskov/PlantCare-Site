# 🌿 PlantCare Website

Официальный одностраничный сайт для распространения приложения **PlantCare** — умного помощника для ухода за растениями.

Всё в одном файле `index.html` (встроенные `<style>` и `<script>`) — быстрый старт, нет зависимостей от внешних CSS/JS файлов.

---

## ✨ Возможности сайта

- 🎨 **Премиум-дизайн** — современной UI/UX, градиенты, плавные анимации
- 🌓 **Тёмная/светлая тема** — мгновенное определение темы до отрисовки (`<head>` скрипт), переключатель с сохранением в `localStorage`, поддержка `prefers-color-scheme` и плавный переход цветов
- 🌱 **Кастомный курсор** — работает только на устройствах `hover+fine`, с lerp-сглаживанием
- 📱 **Адаптив** — корректное отображение от 320px до 4K
- ♿ **Доступность** — skip-link, ARIA на табах/FAQ/lightbox, focus-trap в lightbox, клавиатурная навигация (стрелки между страницами буклета, Enter на табах)
- 🔍 **SEO** — Open Graph, Twitter Cards, canonical, JSON-LD (`SoftwareApplication`, `FAQPage`, `VideoObject`, `WebSite`)
- ⚡ **Производительность** — нет blocking-loading экрана, scroll-reveal через `IntersectionObserver`, rAF-throttled scroll listeners, параллакс блобов
- 🎭 **Интерактив** — typing-эффект, scroll progress, scrollspy, активный пункт меню на десктоп и мобиле, бесшовная карусель разделов, 3D-tilt карточек, reveal section dividers, Konami-egg

---

## 📑 Секции страницы

1. **Hero** — заголовок, тайпинг, phone-mockup с live-status, статистика
2. **AI Cascade** — 5 уровней ИИ по порядку
3. **Integrations** — strip бесплатных API и сервисов
4. **Features** — 9 функций приложения
5. **Proxy Indicator** — объяснение статусов кружка
6. **Smart Care** — забота о поливе/удобрении/опрыскивании/пересадке
7. **Wikipedia + RAG** — как ИИ ищет факты
8. **Chat Demo** — переключаемые вкладки, typing-индикатор
9. **Разделы** — бесшовная карусель
10. **Download** — APK/EXE/MSI/PDF + видео + буклет + install-инструкция
11. **Roadmap** — Что уже / В разработке / В планах
12. **Changelog** — таймлайн v1.0 → v1.1 → v1.2
13. **Reviews** — отзывы пользователей
14. **Comparison** — PlantCare vs обычный справочник
15. **Privacy** — данные остаются на устройстве
16. **FAQ** — 7 вопросов (JSON-LD `FAQPage`)
17. **About** — автор, статистика, технологии
18. **Support** — ссылки для обратной связи
19. **CTA** + **Footer**

---

## 📁 Структура проекта

```
PlantCare-Site/
├── index.html              # Весь сайт (HTML + inline CSS + inline JS)
├── generate-downloads.js   # Node-генератор downloads.json из Releases/
├── downloads.json          # Сгенерированный список (не используется HTML-разметкой, можно подключить через fetch)
├── Releases/               # APK, EXE, MSI, PDF, MP4, буклеты
├── README.md               # Документация
└── .netlify/               # Конфиг Netlify (опционально)
```

## 🚀 Запуск локально

Откройте `index.html` в браузере. Для разработки можно поднять простой сервер:

```bash
npx serve .
# или
python -m http.server 8080
```

## 🔄 Регенерация `downloads.json`

```bash
node generate-downloads.js
```

---

## 🐛 Поддержка браузеров

| Браузер | Минимальная версия |
|---------|-------------------|
| Chrome  | 90+               |
| Firefox | 88+               |
| Safari  | 14+               |
| Edge    | 90+               |

## 📝 Лицензия

Проект PlantCare создан **Денисом Аниськовым**. Открытый код на [GitHub](https://github.com/DenisAniskov/PlantCare-Site).

- ✅ Личное использование
- ✅ Образовательные цели
- ✅ Некоммерческое распространение