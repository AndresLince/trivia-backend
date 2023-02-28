import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export class HttpUtilsHandler {
    validateFields(request: Request, response: Response, next: NextFunction) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({
                errors: errors.mapped()
            });
        }

        next();
    }

    sendBasicJsonResponse(res: Response, status: number, message: string) {
        return res.status(status).json({
            message: message,
        });
    }
}