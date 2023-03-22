/*
Route: /api/question-category
*/
import { Router } from 'express';
const router = Router();
import { QuestionCategoryHandlerInterface } from '../interfaces/questionCategory.handler.interface';
import { QuestionCategoryRouteConstructorInterface } from '../interfaces/route/questionCategory.route.interface';

export class QuestionCategoryRoute {
    private questionCategoryHandler: QuestionCategoryHandlerInterface;
    constructor({ questionCategoryHandler }: QuestionCategoryRouteConstructorInterface) {
        this.questionCategoryHandler = questionCategoryHandler;
    }

    createRoutes(): Router {
        return router.get('/', [], this.questionCategoryHandler.getAll);
    }
}
