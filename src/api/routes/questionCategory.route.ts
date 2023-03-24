/*
Route: /api/question-category
*/
import { Router } from 'express';
import { HttpUtilsHandler } from '../handlers/httpUtilsHandler';
const router = Router();
import { QuestionCategoryHandlerInterface } from '../interfaces/questionCategory.handler.interface';
import { QuestionCategoryRouteConstructorInterface } from '../interfaces/route/questionCategory.route.interface';

export class QuestionCategoryRoute {
    private questionCategoryHandler: QuestionCategoryHandlerInterface;
    private httpUtilsHandler: HttpUtilsHandler;
    constructor({ questionCategoryHandler, httpUtilsHandler }: QuestionCategoryRouteConstructorInterface) {
        this.questionCategoryHandler = questionCategoryHandler;
        this.httpUtilsHandler = httpUtilsHandler
    }

    createRoutes(): Router {
        return router.get('/', [
            this.httpUtilsHandler.validateJsonWebToken
        ], this.questionCategoryHandler.getAll);
    }
}
