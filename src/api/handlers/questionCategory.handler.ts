import { Request, Response } from 'express';
import { QuestionCategoryHandlerConstructorInterface, QuestionCategoryHandlerInterface } from '../interfaces/questionCategory.handler.interface';
import { QuestionCategoryRepositoryInterface } from '../interfaces/questionCategory.repository.interface';
import { HttpUtilsHandler } from './httpUtilsHandler';

export class QuestionCategoryHandler implements QuestionCategoryHandlerInterface {
    private questionCategoryRepository: QuestionCategoryRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandler;
    constructor({ questionCategoryRepository, httpUtilsHandler }: QuestionCategoryHandlerConstructorInterface) {
        this.questionCategoryRepository = questionCategoryRepository;
        this.httpUtilsHandler = httpUtilsHandler;
        this.getAll = this.getAll.bind(this);
    }
    async getAll(request: Request, response: Response): Promise<any> {
        try {
            const questionCategories = await this.questionCategoryRepository.searchAll();
            return response.status(200).send({
                data: questionCategories,
            });
        } catch (error) {
            console.log(error);
            return response.status(500).send({
                message: "Error interno por favor intenta nuevamente",
            });
        }
    }
}
