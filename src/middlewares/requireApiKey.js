export function requireApiKey(req, res, next) {
    const key = req.get('X-API-Key');
    if (key !== 'secret') {
        return res.status(401).json({ error: 'unauthorized' });
    }
    next();
}
