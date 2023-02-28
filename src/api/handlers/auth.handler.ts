import { Request, Response } from 'express';

export class AuthHandler {
    signUp(request: Request, response: Response): void {
        response.status(200).send({
            message: "Usuario logueado correctamente"
        });
    }
}
