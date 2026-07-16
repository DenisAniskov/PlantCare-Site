// ============================================
// PlantCare - Генератор downloads.json (ESM)
// Запуск: node generate-downloads.js
// ============================================
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const releasesDir = path.join(__dirname, 'Releases');
const outputFile = path.join(__dirname, 'downloads.json');

function parseFileName(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const base = path.basename(fileName, ext);
    let m = base.match(/PlantCare-v?([\d.]+)/i);
    if (m) return { platform: ext === '.apk' ? 'android' : 'windows', version: m[1], kind: ext === '.apk' ? 'apk' : (ext === '.exe' ? 'exe' : 'msi') };
    if (/PlantCare-latest/i.test(base)) return { platform: 'windows', version: 'latest', kind: ext === '.exe' ? 'exe' : 'msi' };
    if (/documentation/i.test(base)) return { platform: 'docs', version: '', kind: 'pdf' };
    return null;
}

function getPlatformInfo(rec) {
    switch (rec.platform) {
        case 'android': return { icon: '🤖', name: 'Android', format: 'APK' };
        case 'windows': return { icon: '🪟', name: 'Windows', format: rec.kind === 'exe' ? 'EXE' : 'MSI' };
        case 'docs':    return { icon: '📚', name: 'Документация', format: 'PDF' };
        default:        return { icon: '📦', name: 'Unknown', format: rec.kind ? rec.kind.toUpperCase() : '' };
    }
}

function formatFileSize(bytes) {
    if (!bytes) return '0 Байт';
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

if (!fs.existsSync(releasesDir)) {
    console.error('❌ Папка Releases не найдена:', releasesDir);
    process.exit(1);
}

const downloads = fs.readdirSync(releasesDir)
    .map(fileName => {
        const filePath = path.join(releasesDir, fileName);
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) return null;
        const parsed = parseFileName(fileName);
        if (!parsed) return null;
        const info = getPlatformInfo(parsed);
        const size = stats.size;
        return {
            id: `${parsed.platform}-${parsed.kind}-${parsed.version || 'latest'}`,
            platform: parsed.platform,
            platformName: info.name,
            icon: info.icon,
            version: parsed.version || 'latest',
            format: info.format,
            fileName,
            filePath: `Releases/${fileName}`,
            size,
            sizeFormatted: formatFileSize(size),
            releaseDate: stats.mtime.toISOString().split('T')[0],
            experimental: /beta|alpha/i.test(parsed.version)
        };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

fs.writeFileSync(outputFile, JSON.stringify(downloads, null, 2), 'utf8');
console.log(`✅ downloads.json создан. Релизов: ${downloads.length}`);
downloads.forEach(d => console.log(`   ${d.icon} ${d.platformName} ${d.version} (${d.sizeFormatted})`));