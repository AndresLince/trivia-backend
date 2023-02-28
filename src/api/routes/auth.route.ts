import { AuthHandler } from "../handlers/auth.handler";
import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";

/*
Route: /api/auth
*/
import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';

export class AuthRoute {
    private authHandler: AuthHandler;
    private httpUtilsHandler: HttpUtilsHandler;
    constructor() {
        this.authHandler = new AuthHandler();
        this.httpUtilsHandler = new HttpUtilsHandler();
    }

    createRoutes(): Router {
        router.post('/signup', [
            check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.authHandler.signUp);
        return router;
    }
}
