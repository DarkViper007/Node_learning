import { ZodError } from 'zod';
import { HttpError } from '../errors/httpError.js';

export function validate(schema, data) {
    try {
        return schema.parse(data);
    } catch (err) {
        if (err instanceof ZodError) {
            const details = err.issues.map((i) => ({
                path: i.path.join('.'),
                message: i.message,
            }));

            throw new HttpError(400, 'Validation error', details);
        }
        throw err;
    }
}
