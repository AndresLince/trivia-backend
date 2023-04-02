import { Request, Response } from 'express';
import { CryptoHandlerInterface } from '../interfaces/handler/crypto.handler.interface';
import { HttpUtilsHandlerInterface } from '../interfaces/handler/http.handler.interface';
import { QuestionCategoryHandlerConstructorInterface, QuestionCategoryHandlerInterface } from '../interfaces/questionCategory.handler.interface';
import { QuestionCategoryRepositoryInterface } from '../interfaces/questionCategory.repository.interface';

export class QuestionCategoryHandler implements QuestionCategoryHandlerInterface {
    private questionCategoryRepository: QuestionCategoryRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandlerInterface;
    private cryptoHandler: CryptoHandlerInterface;
    constructor({ questionCategoryRepository, httpUtilsHandler, cryptoHandler }: QuestionCategoryHandlerConstructorInterface) {
        this.questionCategoryRepository = questionCategoryRepository;
        this.httpUtilsHandler = httpUtilsHandler;
        this.cryptoHandler = cryptoHandler;
        this.getAll = this.getAll.bind(this);
    }
    async getAll(request: Request, response: Response): Promise<any> {
        try {
            const questionCategories = await this.questionCategoryRepository.searchAll();
            this.cryptoHandler.encryptFields(questionCategories, 'idQuestionCategory');
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
