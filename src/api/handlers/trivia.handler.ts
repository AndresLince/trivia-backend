import { Request, Response } from 'express';
import { CryptoHandlerInterface } from '../interfaces/handler/crypto.handler.interface';
import { HttpUtilsHandlerInterface } from '../interfaces/handler/http.handler.interface';
import { TriviaHandlerConstructorInterface, TriviaHandlerInterface } from '../interfaces/handler/trivia.handler.interface';
import { CreateTrivia } from '../interfaces/model/create-trivia.model';
import { TriviaRepositoryInterface } from '../interfaces/repository/trivia.repository.interface';
import { AddQuestionsToTrivia } from '../interfaces/model/add-question-to-trivia.model';
import { SetSelectedAnswer } from '../interfaces/model/set-selected-answer.model';

export class TriviaHandler implements TriviaHandlerInterface {
    private triviaRepository: TriviaRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandlerInterface;
    private cryptoHandler: CryptoHandlerInterface;
    constructor({ triviaRepository, httpUtilsHandler, cryptoHandler }: TriviaHandlerConstructorInterface) {
        this.triviaRepository = triviaRepository;
        this.httpUtilsHandler = httpUtilsHandler;
        this.cryptoHandler = cryptoHandler;
        this.create = this.create.bind(this);
        this.getQuestion = this.getQuestion.bind(this);
        this.setSelectedAnswer = this.setSelectedAnswer.bind(this);
        this.getSummary = this.getSummary.bind(this);
    }
    async create(request: Request, response: Response): Promise<any> {
        let { userId, idQuestionCategory } = request.body;
        idQuestionCategory = this.cryptoHandler.decrypt(idQuestionCategory);

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
    async getQuestion(request: Request, response: Response): Promise<any> {
        let { idTrivia } = request.params;
        idTrivia = this.cryptoHandler.decrypt(idTrivia);

        try {
            const question = await this.triviaRepository.getQuestion(idTrivia);
            if (question) {
                this.cryptoHandler.encryptFields(question.answers, 'idAnswer');
                question.idQuestion = this.cryptoHandler.encrypt(question.idQuestion.toString());
                return response.status(200).send({
                    data: question
                });
            }

            return response.status(404).send({
                data: {}
            });
        } catch (error) {
            console.log(error);
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 500, "Error interno por favor intenta nuevamente");
        }
    }
    async setSelectedAnswer(request: Request, response: Response): Promise<any> {
        const { idTrivia, idQuestion, idSelectedAnswer } = request.body;

        const selectedAnswerModel: SetSelectedAnswer = {
            idTrivia: this.cryptoHandler.decrypt(idTrivia.toString()),
            idQuestion: this.cryptoHandler.decrypt(idQuestion.toString()),
            idSelectedAnswer: this.cryptoHandler.decrypt(idSelectedAnswer.toString())
        };

        try {
            const result = await this.triviaRepository.setSelectedAnswer(selectedAnswerModel);
            if (result) {
                return response.status(200).send({
                    message: 'Se actualizo correctamente la respuesta'
                });
            }

            return response.status(404).send({
                message: 'Error datos incorrectos'
            });
        } catch (error) {
            console.log(error);
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 500, "Error interno por favor intenta nuevamente");
        }
    }

    async getSummary(request: Request, response: Response): Promise<any> {
        let { idTrivia } = request.params;
        const { userId } = request.body;

        idTrivia = this.cryptoHandler.decrypt(idTrivia);

        try {
            const trivia = await this.triviaRepository.search(userId);
            if (trivia && trivia.idTrivia === idTrivia) {
                const update = await this.triviaRepository.closeTrivia(idTrivia, userId);
                if (!update) {
                    return response.status(400).send({
                        message: 'Error al cerrar la trivia'
                    });
                }
            }

            const score = await this.triviaRepository.getScore(idTrivia);
            if (score !== null) {
                return response.status(200).send({
                    score
                });
            }

            return response.status(404).send({
                message: 'Error datos incorrectos'
            });
        } catch (error) {
            console.log(error);
            return this.httpUtilsHandler.sendBasicJsonResponse(response, 500, "Error interno por favor intenta nuevamente");
        }
    }
}
