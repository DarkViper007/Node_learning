export function requireApiKey(expectedKey) {
    return function (req, res, next) {
        const key = req.get('X-API-Key');
        if (key !== expectedKey) {
            return res.status(401).json({ error: 'unauthorized' });
        }
        next();
    };
}
