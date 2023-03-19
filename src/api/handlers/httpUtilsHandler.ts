import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../services/config.service';

export class HttpUtilsHandler {
    private configService: ConfigService;
    constructor({ configService }: any) {
        this.configService = configService;
    }
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
    generateJsonWebToken = (modelId: string) => {
        return new Promise((resolve, reject) => {
            const payload = {
                modelId
            };
            sign(payload, this.configService.getConfig('JSON_WEB_TOKEN_SECRET'), {
                expiresIn: '12h'
            }, (err, token) => {
                if (err) {
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
                }
            });
        });
    };
}
