const sanitizeUrl = (url) => {
    if (!url) return '';
    let clean = url.trim().replace(/"/g, '').replace(/'/g, '');
    // Fix common missing slash errors: https:/ -> https://
    if (clean.startsWith('https:/') && !clean.startsWith('https://')) {
        clean = clean.replace('https:/', 'https://');
    }
    if (clean.startsWith('http:/') && !clean.startsWith('http://')) {
        clean = clean.replace('http:/', 'http://');
    }
    // Remove trailing slash
    return clean.endsWith('/') ? clean.slice(0, -1) : clean;
};

export const API_BASE = sanitizeUrl(import.meta.env.VITE_API_BASE || 'http://localhost:3000');
export const SOCKET_URL = sanitizeUrl(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000');

export const fixImgUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('data:')) return url;
    // Prepend target base for relative cloudfront or site links
    return `https://www.7cups.com${url.startsWith('/') ? '' : '/'}${url}`;
};
