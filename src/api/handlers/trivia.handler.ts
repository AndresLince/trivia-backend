import { Request, Response } from 'express';
import { TriviaHandlerConstructorInterface, TriviaHandlerInterface } from '../interfaces/handler/trivia.handler.interface';
import { CreateTrivia } from '../interfaces/model/create-trivia.model';
import { TriviaRepositoryInterface } from '../interfaces/repository/trivia.repository.interface';
import { HttpUtilsHandler } from './httpUtilsHandler';

export class TriviaHandler implements TriviaHandlerInterface {
    private triviaRepository: TriviaRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandler;
    constructor({ triviaRepository, httpUtilsHandler }: TriviaHandlerConstructorInterface) {
        this.triviaRepository = triviaRepository;
        this.httpUtilsHandler = httpUtilsHandler;
        this.create = this.create.bind(this);
    }
    async create(request: Request, response: Response): Promise<any> {
        const { userId, idQuestionCategory } = request.body;

        const triviaModel: CreateTrivia = {
            idUser: userId,
            idQuestionCategory: idQuestionCategory,
        };

        try {
            const { insertId } = await this.triviaRepository.create(triviaModel);

            return this.httpUtilsHandler.sendBasicJsonResponse(response, 200, "trivia creada correctamente");
        } catch (error) {
            console.log(error);
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 500, "Error interno por favor intenta nuevamente");
        }
    }
}
