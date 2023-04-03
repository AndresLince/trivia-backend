import { Request, Response } from 'express';
import { CryptoHandlerInterface } from '../interfaces/handler/crypto.handler.interface';
import { HttpUtilsHandlerInterface } from '../interfaces/handler/http.handler.interface';
import { TriviaHandlerConstructorInterface, TriviaHandlerInterface } from '../interfaces/handler/trivia.handler.interface';
import { CreateTrivia } from '../interfaces/model/create-trivia.model';
import { TriviaRepositoryInterface } from '../interfaces/repository/trivia.repository.interface';
import { AddQuestionsToTrivia } from '../interfaces/model/add-question-to-trivia.model';

export class TriviaHandler implements TriviaHandlerInterface {
    private triviaRepository: TriviaRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandlerInterface;
    private cryptoHandler: CryptoHandlerInterface;
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
            idQuestionCategory: this.cryptoHandler.decrypt(idQuestionCategory),
        };

        try {
            const trivia = await this.triviaRepository.search(triviaModel.idUser);
            if (trivia) {
                return response.status(200).send({
                    idTrivia: this.cryptoHandler.encrypt(trivia.idTrivia.toString()),
                });
            }

            const { insertId } = await this.triviaRepository.create(triviaModel);

            const addQuestionsToTriviaModel: AddQuestionsToTrivia = {
                idTrivia: insertId,
                idQuestionCategory: idQuestionCategory,
            };

            await this.triviaRepository.addQuestionsToTrivia(addQuestionsToTriviaModel);

            return response.status(200).send({
                idTrivia: this.cryptoHandler.encrypt(insertId.toString()),
            });
        } catch (error) {
            console.log(error);
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 500, "Error interno por favor intenta nuevamente");
        }
    }
}
