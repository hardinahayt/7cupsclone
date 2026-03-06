const sanitizeUrl = (url) => {
    if (!url) return '';
    console.log("[Config] v3 Raw Input:", url);

    // Nuclear Option: Find first "http" and take everything until next quote/tick/space/percent
    const match = url.match(/(https?:\/+[^\s"'%]+)/);
    let clean = match ? match[0] : url.trim()
        .replace(/"/g, '')
        .replace(/'/g, '')
        .replace(/%22/g, '');

    // Fix missing slashes (common in user input like https:/render.com)
    if (clean.includes('https:/') && !clean.includes('https://')) {
        clean = clean.replace('https:/', 'https://');
    }

    // Final trim of trailing slashes
    clean = clean.replace(/\/+$/, '');

    console.log(`[Config] v3 Sanitized: -> "${clean}"`);
    return clean;
};

console.log("[Config] v3 Module Loaded");

console.log("[Config] Raw VITE_API_BASE:", import.meta.env.VITE_API_BASE);
export const API_BASE = sanitizeUrl(import.meta.env.VITE_API_BASE || 'http://localhost:3000');
export const SOCKET_URL = sanitizeUrl(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000');

export const fixImgUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('data:')) return url;
    // Prepend target base for relative cloudfront or site links
    return `https://www.7cups.com${url.startsWith('/') ? '' : '/'}${url}`;
};
