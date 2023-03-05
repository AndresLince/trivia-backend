import { AuthHandler } from "../handlers/auth.handler";
import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { UserRepositoryMysql } from "../repositories/user.repository.mysql"

/*
Route: /api/auth
*/
import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';
import { AuthRouteConstructorInterface } from "../interfaces/auth.route.interface";

export class AuthRoute {
    private authHandler: AuthHandler;
    private httpUtilsHandler: HttpUtilsHandler;
    constructor({ userRepository }: AuthRouteConstructorInterface) {
        this.httpUtilsHandler = new HttpUtilsHandler();
        this.authHandler = new AuthHandler({
            userRepository: userRepository
        });
    }

    createRoutes(): Router {
        router.post('/signup', [
            check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.authHandler.signUp);
        return router;
    }
}
