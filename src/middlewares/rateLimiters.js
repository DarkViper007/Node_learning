import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

function limiterKey(req) {
    const apiKey = req.get('X-API-Key');
    if (apiKey && apiKey.trim().length > 0) return `key:${apiKey.trim()}`;

    // IMPORTANT: use ipKeyGenerator instead of req.ip
    return `ip:${ipKeyGenerator(req)}`;
}

export const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: limiterKey,
    message: { error: 'Too many requests' },
});

export const createUserLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    keyGenerator: limiterKey,
    message: { error: 'Too many create user requests' },
});




