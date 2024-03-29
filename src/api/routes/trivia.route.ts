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
        router.put('/answer', [
            this.httpUtilsHandler.validateJsonWebToken,
            check('idTrivia', 'La trivia es obligatoria').not().isEmpty(),
            check('idQuestion', 'La pregunta es obligatoria').not().isEmpty(),
            check('idSelectedAnswer', 'La respuesta es obligatoria').not().isEmpty(),
            this.httpUtilsHandler.validateFields
        ], this.triviaHandler.setSelectedAnswer);
        router.get('/question/:idTrivia', [
            this.httpUtilsHandler.validateJsonWebToken
        ], this.triviaHandler.getQuestion);
        router.get('/summary/:idTrivia', [
            this.httpUtilsHandler.validateJsonWebToken
        ], this.triviaHandler.getSummary);
        return router;
    }
}
