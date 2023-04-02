import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";

/*
Route: /api/auth
*/
import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';
import { AuthRouteConstructorInterface } from "../interfaces/auth.route.interface";
import { AuthHandlerInterface } from "../interfaces/auth.handler.interface";
import { HttpUtilsHandlerInterface } from "../interfaces/handler/http.handler.interface";

export class AuthRoute {
    private authHandler: AuthHandlerInterface;
    private httpUtilsHandler: HttpUtilsHandlerInterface;
    constructor({ authHandler, httpUtilsHandler }: AuthRouteConstructorInterface) {
        this.httpUtilsHandler = httpUtilsHandler;
        this.authHandler = authHandler;
    }

    createRoutes(): Router {
        router.post('/signup', [
            check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
            check('ip', 'la ip del usuario es obligatoria').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.authHandler.signUp );
        router.get('/renew', [
            this.httpUtilsHandler.validateJsonWebToken
        ], this.authHandler.renewJsonWebToken );
        return router;
    }
}
