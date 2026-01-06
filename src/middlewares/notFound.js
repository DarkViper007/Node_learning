import { HttpError } from '../errors/httpError.js';

export function notFound(req, res, next) {
    next(new HttpError(404, 'Route not found'));
}