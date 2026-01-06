import { HttpError } from '../errors/httpError.js';

export function errorHandler(err, req, res, next) {
    const isHttpError = err instanceof HttpError;

    const statusCode = isHttpError ? err.statusCode : 500;
    const message = isHttpError ? err.message : 'Internal Server Error';

    // Optional: avoid leaking stack in production
    const response = {
        error: message,
    };

    if (isHttpError && err.details !== undefined) {
        response.details = err.details;
    }

    res.status(statusCode).json(response);
}
