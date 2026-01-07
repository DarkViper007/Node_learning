import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 120,          // 120 requests per minute per IP
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many requests' },
});

export const createUserLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 10,           // 10 create attempts per minute per IP
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Too many create user requests' },
});
