import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";

/*
Route: /api/auth
*/
import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';
import { AuthRouteConstructorInterface } from "../interfaces/auth.route.interface";
import { AuthHandlerInterface } from "../interfaces/auth.handler.interface";

export class AuthRoute {
    private authHandler: AuthHandlerInterface;
    private httpUtilsHandler: HttpUtilsHandler;
    constructor({ authHandler }: AuthRouteConstructorInterface) {
        this.httpUtilsHandler = new HttpUtilsHandler();
        this.authHandler = authHandler;
    }

    createRoutes(): Router {
        router.post('/signup', [
            check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
            check('ip', 'la ip del usuario es obligatoria').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.authHandler.signUp );
        return router;
    }
}
