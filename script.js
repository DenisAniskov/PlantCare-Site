// ============================================
// PlantCare Website - Interactive JavaScript
// Created by: Denis Aniskov
// ============================================

// ============================================
// Theme Switcher
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Проверяем сохраненную тему или системные настройки
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        html.setAttribute('data-theme', 'dark');
    }
    
    // Обновляем иконку
    updateThemeIcon();
    
    // Обработчик переключения темы
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
        
        // Добавляем эффект анимации
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

function updateThemeIcon() {
    const html = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

// ============================================
// Scroll to Top Button
// ============================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Показываем кнопку при прокрутке
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Прокрутка наверх при клике
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Smooth Scrolling для навигации
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Header scroll effect
// ============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Download Tracking (Отслеживание скачиваний)
// ============================================
function initDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = button.closest('.download-card');
            const appName = card.querySelector('.download-title').textContent;
            const version = card.querySelector('.detail-item:first-child .detail-value').textContent;
            
            // Логируем скачивание (можно отправить на аналитику)
            console.log(`Download: ${appName} ${version}`);
            
            // Визуальная обратная связь
            button.innerHTML = '<span>✓</span> Скачивание начато...';
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.innerHTML = '<span>📥</span> Скачать';
                button.style.opacity = '1';
            }, 2000);
        });
    });
}

// ============================================
// Анимация появления элементов при прокрутке
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Анимируем карточки
    const cards = document.querySelectorAll('.feature-card, .download-card, .instruction-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================
// Счетчик статистики с анимацией
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.getAttribute('data-count');
                
                if (finalValue && !target.classList.contains('animated')) {
                    target.classList.add('animated');
                    animateValue(target, 0, parseInt(finalValue), 2000);
                }
            }
        });
    });
    
    counters.forEach(counter => {
        const text = counter.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (number) {
            counter.setAttribute('data-count', number);
            counter.textContent = '0' + text.replace(/\d+/, '');
            observer.observe(counter);
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const suffix = element.textContent.replace(/\d+/g, '').trim();
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + (suffix ? ' ' + suffix : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (suffix ? ' ' + suffix : '');
        }
    }, 16);
}

// ============================================
// Интерактивные карточки с 3D эффектом
// ============================================
function init3DCards() {
    const cards = document.querySelectorAll('.feature-card, .download-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// Копирование команд установки
// ============================================
function initCopyButtons() {
    const codeBlocks = document.querySelectorAll('.instruction-card code');
    
    codeBlocks.forEach(block => {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        
        const copyBtn = document.createElement('button');
        copyBtn.innerHTML = '📋';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(76, 175, 80, 0.1);
            border: 1px solid rgba(76, 175, 80, 0.3);
            border-radius: 8px;
            padding: 6px 12px;
            cursor: pointer;
            transition: all 0.2s;
        `;
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                copyBtn.innerHTML = '✓';
                copyBtn.style.background = 'rgba(76, 175, 80, 0.3)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '📋';
                    copyBtn.style.background = 'rgba(76, 175, 80, 0.1)';
                }, 2000);
            });
        });
        
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        wrapper.appendChild(copyBtn);
    });
}

// ============================================
// Активная ссылка в навигации
// ============================================
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Добавление стиля для активной ссылки
// ============================================
function addActiveNavStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-primary) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Lazy loading изображений (если будут добавлены)
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Форматирование размера файлов
// ============================================
function formatFileSize() {
    const sizeElements = document.querySelectorAll('[data-size]');
    
    sizeElements.forEach(element => {
        const bytes = parseInt(element.getAttribute('data-size'));
        const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
        
        if (bytes === 0) {
            element.textContent = '0 Байт';
            return;
        }
        
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(2);
        
        element.textContent = `${size} ${sizes[i]}`;
    });
}

// ============================================
// Пасхалки и интересные эффекты
// ============================================
function initEasterEggs() {
    // Конфетти при клике на логотип 🎉
    const logo = document.querySelector('.nav-logo');
    let clickCount = 0;
    
    logo.addEventListener('click', () => {
        clickCount++;
        
        if (clickCount >= 5) {
            createConfetti();
            clickCount = 0;
        }
    });
}

function createConfetti() {
    const colors = ['#4CAF50', '#2E7D32', '#8BC34A', '#00BCD4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            pointer-events: none;
            z-index: 9999;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        
        document.body.appendChild(confetti);
        
        const duration = 2000 + Math.random() * 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                confetti.style.top = (progress * 100 + Math.sin(progress * 10) * 5) + 'vh';
                confetti.style.opacity = 1 - progress;
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        animate();
    }
}

// ============================================
// Предзагрузка критических ресурсов
// ============================================
function preloadResources() {
    // Предзагрузка шрифтов Google Fonts
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);
    
    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);
}

// ============================================
// Инициализация всех функций
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Основные функции
    initTheme();
    initScrollTop();
    initSmoothScroll();
    initHeaderScroll();
    initDownloadTracking();
    
    // Анимации
    initScrollAnimations();
    animateCounters();
    init3DCards();
    
    // Навигация
    addActiveNavStyle();
    initActiveNav();
    
    // Дополнительные функции
    initLazyLoading();
    formatFileSize();
    initEasterEggs();
    preloadResources();
    
    // Логируем успешную инициализацию
    console.log('%c🌱 PlantCare Website', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
    console.log('%cСоздано с ❤️ by Denis Aniskov', 'color: #6B7280; font-size: 12px;');
    console.log('%cВерсия: 1.0.0', 'color: #6B7280; font-size: 12px;');
});

// ============================================
// Performance monitoring
// ============================================
window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    const loadTime = perfData.loadEventEnd - perfData.fetchStart;
    
    console.log(`⚡ Время загрузки страницы: ${(loadTime / 1000).toFixed(2)}s`);
});

// ============================================
// Экспорт функций для внешнего использования
// ============================================
window.PlantCare = {
    version: '1.0.0',
    toggleTheme: () => document.getElementById('theme-toggle').click(),
    scrollToTop: () => document.getElementById('scroll-top').click(),
    enableConfetti: createConfetti
};
