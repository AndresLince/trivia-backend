import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '../services/config.service';
interface JwtPayload {
    userId: string
}

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
    generateJsonWebToken = (userId: string) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId
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
    validateJsonWebToken = (req: Request<any>, res: Response, next: NextFunction) => {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'No hay token'
            });
        }
        try {
            const { userId } = verify(token, this.configService.getConfig('JSON_WEB_TOKEN_SECRET')) as JwtPayload;
            req.body.userId = userId;

            next();
        } catch (error) {
            return res.status(400).json({
                ok: false,
                message: 'Token incorrecto'
            });
        }
    };
}
