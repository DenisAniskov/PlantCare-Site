// ============================================
// PlantCare - Генератор downloads.json
// Используется для Node.js при деплое
// ============================================

const fs = require('fs');
const path = require('path');

const releasesDir = path.join(__dirname, '..', 'Releases');
const outputFile = path.join(__dirname, 'downloads.json');

// Парсинг информации из имени файла
function parseFileName(fileName) {
    // PlantCare-android-v0.8.2.apk -> { platform: 'android', version: '0.8.2' }
    const match = fileName.match(/PlantCare-(\w+)-v?([\d.]+)/i);
    
    if (match) {
        return {
            platform: match[1].toLowerCase(),
            version: match[2]
        };
    }
    
    return null;
}

// Определение иконки и названия платформы
function getPlatformInfo(platform, fileName) {
    const ext = path.extname(fileName).toLowerCase();
    
    const platformMap = {
        'android': { icon: '🤖', name: 'Android', format: 'APK' },
        'windows': { icon: '🪟', name: 'Windows', format: ext === '.exe' ? 'EXE' : 'MSI' },
        'linux': { icon: '🐧', name: 'Linux', format: 'AppImage' },
        'macos': { icon: '🍎', name: 'macOS', format: 'DMG' }
    };
    
    return platformMap[platform] || { icon: '📦', name: 'Unknown', format: ext.toUpperCase() };
}

// Получение размера файла
function getFileSize(filePath) {
    try {
        const stats = fs.statSync(filePath);
        return stats.size;
    } catch (error) {
        return 0;
    }
}

// Форматирование размера файла
function formatFileSize(bytes) {
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    
    if (bytes === 0) return '0 Байт';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, i)).toFixed(2);
    
    return `${size} ${sizes[i]}`;
}

// Генерация JSON файла
function generateDownloadsJSON() {
    if (!fs.existsSync(releasesDir)) {
        console.error('❌ Папка Releases не найдена:', releasesDir);
        return;
    }
    
    const files = fs.readdirSync(releasesDir);
    const downloads = [];
    
    files.forEach(fileName => {
        const filePath = path.join(releasesDir, fileName);
        const stats = fs.statSync(filePath);
        
        if (!stats.isFile()) return;
        
        const parsed = parseFileName(fileName);
        
        if (parsed) {
            const platformInfo = getPlatformInfo(parsed.platform, fileName);
            const fileSize = getFileSize(filePath);
            
            downloads.push({
                id: `${parsed.platform}-${parsed.version}`,
                platform: parsed.platform,
                platformName: platformInfo.name,
                icon: platformInfo.icon,
                version: parsed.version,
                format: platformInfo.format,
                fileName: fileName,
                filePath: `Releases/${fileName}`,
                size: fileSize,
                sizeFormatted: formatFileSize(fileSize),
                releaseDate: stats.mtime.toISOString().split('T')[0],
                experimental: parsed.version.includes('beta') || parsed.version.includes('alpha')
            });
        }
    });
    
    // Сортировка по дате (новые сверху)
    downloads.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    
    // Сохранение в JSON
    fs.writeFileSync(outputFile, JSON.stringify(downloads, null, 2), 'utf8');
    
    console.log('✅ Файл downloads.json создан успешно!');
    console.log(`📦 Найдено релизов: ${downloads.length}`);
    
    downloads.forEach(dl => {
        console.log(`   ${dl.icon} ${dl.platformName} ${dl.version} (${dl.sizeFormatted})`);
    });
}

// Запуск генератора
try {
    generateDownloadsJSON();
} catch (error) {
    console.error('❌ Ошибка при генерации downloads.json:', error);
    process.exit(1);
}
