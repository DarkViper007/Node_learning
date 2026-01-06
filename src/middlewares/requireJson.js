export function requireJson(req, res, next) {
    const contentType = req.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
        return res.status(415).json({ error: 'Content-Type must be application/json' });
    }
    next();
}
