const sanitizeUrl = (url) => {
    if (!url) return '';
    // Remove literal quotes, encoded quotes (%22), and single quotes
    let clean = url.trim()
        .replace(/"/g, '')
        .replace(/'/g, '')
        .replace(/%22/g, '');

    // Fix common missing slash errors: https:/ -> https://
    if (clean.startsWith('https:/') && !clean.startsWith('https://')) {
        clean = clean.replace('https:/', 'https://');
    }
    // Remove trailing slash
    clean = clean.endsWith('/') ? clean.slice(0, -1) : clean;

    console.log(`[Config] Sanitized URL: "${url}" -> "${clean}"`);
    return clean;
};

console.log("[Config] Raw VITE_API_BASE:", import.meta.env.VITE_API_BASE);
export const API_BASE = sanitizeUrl(import.meta.env.VITE_API_BASE || 'http://localhost:3000');
export const SOCKET_URL = sanitizeUrl(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000');

export const fixImgUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('data:')) return url;
    // Prepend target base for relative cloudfront or site links
    return `https://www.7cups.com${url.startsWith('/') ? '' : '/'}${url}`;
};
