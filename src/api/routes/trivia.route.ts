/*
Route: /api/trivia
*/
import { Router } from 'express';
import { TriviaHandlerInterface } from '../interfaces/handler/trivia.handler.interface';
import { check } from 'express-validator';
const router = Router();
import { TriviaRouteConstructorInterface } from '../interfaces/route/trivia.route.interface';
import { RouteInterface } from '../interfaces/route/route.interface';
import { HttpUtilsHandlerInterface } from '../interfaces/handler/http.handler.interface';

export class TriviaRoute implements RouteInterface {
    private triviaHandler: TriviaHandlerInterface;
    private httpUtilsHandler: HttpUtilsHandlerInterface;
    constructor({ triviaHandler, httpUtilsHandler }: TriviaRouteConstructorInterface) {
        this.triviaHandler = triviaHandler;
        this.httpUtilsHandler = httpUtilsHandler;
    }

    createRoutes(): Router {
        router.post('/', [
            this.httpUtilsHandler.validateJsonWebToken,
            check('idQuestionCategory', 'La categoria es obligatoria').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.triviaHandler.create);
        router.get('/question', [
            this.httpUtilsHandler.validateJsonWebToken,
            check('idTrivia', 'La trivia es obligatoria').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.triviaHandler.getQuestion);
        return router;
    }
}
