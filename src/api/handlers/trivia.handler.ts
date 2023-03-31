import { Request, Response } from 'express';
import { CryptoHandlerInterface } from '../interfaces/handler/crypto.handler.interface';
import { TriviaHandlerConstructorInterface, TriviaHandlerInterface } from '../interfaces/handler/trivia.handler.interface';
import { CreateTrivia } from '../interfaces/model/create-trivia.model';
import { TriviaRepositoryInterface } from '../interfaces/repository/trivia.repository.interface';
import { HttpUtilsHandler } from './httpUtilsHandler';

export class TriviaHandler implements TriviaHandlerInterface {
    private triviaRepository: TriviaRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandler;
    private cryptoHandler: CryptoHandlerInterface
    constructor({ triviaRepository, httpUtilsHandler, cryptoHandler }: TriviaHandlerConstructorInterface) {
        this.triviaRepository = triviaRepository;
        this.httpUtilsHandler = httpUtilsHandler;
        this.cryptoHandler = cryptoHandler;
        this.create = this.create.bind(this);
    }
    async create(request: Request, response: Response): Promise<any> {
        const { userId, idQuestionCategory } = request.body;

        const triviaModel: CreateTrivia = {
            idUser: userId,
            idQuestionCategory: idQuestionCategory,
        };

        try {
            const trivia = await this.triviaRepository.search(triviaModel.idUser);
            if (trivia) {
                return response.status(200).send({
                    idTrivia: this.cryptoHandler.encrypt(trivia.idTrivia.toString()),
                });
            }

            const { insertId } = await this.triviaRepository.create(triviaModel);

            return response.status(200).send({
                idTrivia: this.cryptoHandler.encrypt(insertId.toString()),
            });
        } catch (error) {
            console.log(error);
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 500, "Error interno por favor intenta nuevamente");
        }
    }
}
