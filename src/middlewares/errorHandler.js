import { HttpError } from '../errors/httpError.js';

export function errorHandler(err, req, res, next) {
    console.error('ERROR:', err);
    console.error(err?.stack);

    const isHttpError = err instanceof HttpError;
    const statusCode = isHttpError ? err.statusCode : 500;
    const message = isHttpError ? err.message : 'Internal Server Error';

    res.status(typeof statusCode === 'number' ? statusCode : 500).json({
        error: message,
    });
}
