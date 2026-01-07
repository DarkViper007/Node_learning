import { HttpError } from '../errors/httpError.js';

export function requireJsonAccept(req, res, next) {
    const accept = req.get('Accept');

    // If header missing -> usually allow
    if (!accept) return next();

    // Common valid cases: application/json, */*, application/*, json with params
    const ok =
        accept.includes('application/json') ||
        accept.includes('application/*') ||
        accept.includes('*/*');

    if (!ok) {
        return next(new HttpError(406, 'Not Acceptable'));
    }

    next();
}
