import { InsertModel } from '../interfaces/crud.responses.interface';
import { DatabaseHandlerInterface } from '../interfaces/database.handler';
import { AddQuestionsToTrivia } from '../interfaces/model/add-question-to-trivia.model';
import { AnswerDatabase } from '../interfaces/model/answer-database.model';
import { Answer } from '../interfaces/model/answer.model';
import { CreateTrivia } from '../interfaces/model/create-trivia.model';
import { Question } from '../interfaces/model/question.model';
import { SetSelectedAnswer } from '../interfaces/model/set-selected-answer.model';
import { TriviaModel } from '../interfaces/model/trivia.model';
import { UserScore } from '../interfaces/model/user-score.model';
import { TriviaConstructorInterface, TriviaRepositoryInterface } from '../interfaces/repository/trivia.repository.interface';

export class TriviaRepositoryMysql implements TriviaRepositoryInterface {
    private databaseHandler: DatabaseHandlerInterface;
    constructor({ databaseHandler }: TriviaConstructorInterface) {
        this.databaseHandler = databaseHandler;
    }
    async create({ idUser, idQuestionCategory }: CreateTrivia): Promise<InsertModel> {
        const sql = `call createTrivia(?,?, @last_id)`;
        await this.databaseHandler.getPool().query(sql, [ idQuestionCategory, idUser ]);

        const sql2 = `SELECT @last_id AS insertId`;
        const result = await this.databaseHandler.getPool().query(sql2);
        return result[ 0 ];
    }
    async addQuestionsToTrivia({ idTrivia, idQuestionCategory }: AddQuestionsToTrivia): Promise<boolean> {
        const sql = `call addQuestionsToTrivia(?, ?)`;
        const response = await this.databaseHandler.getPool().query(sql, [ idTrivia, idQuestionCategory ]);
        return response.affectedRows > 0;
    }
    async search(idUser: string): Promise<TriviaModel | null> {
        const sql = `call searchTrivia(?)`;
        const result = await this.databaseHandler.getPool().query(sql, [ idUser ]);

        if (result[ 0 ].length === 0) {
            return null;
        }

        const triviaDb = result[ 0 ][ 0 ];
        const trivia: TriviaModel = {
            idTrivia: triviaDb.idTrivia,
            idUser: triviaDb.idUser,
            idQuestionCategory: triviaDb.idQuestionCategory
        };

        return trivia;
    }
    async getQuestion(idTrivia: string): Promise<Question | null> {
        const sql = `call getTriviaQuestion(?)`;
        const result = await this.databaseHandler.getPool().query(sql, [ idTrivia ]);

        if (result[ 0 ].length === 0) {
            return null;
        }

        const questionDb = result[ 0 ][ 0 ];
        const question: Question = {
            idQuestion: questionDb.idQuestion,
            description: questionDb.questionDescription,
            answers: []
        };
        result[ 0 ].forEach((element: AnswerDatabase) => {
            const answer: Answer =  {
                idAnswer: element.idAnswer,
                description: element.answerDescription
            };
            question.answers.push(answer);
        });

        return question;
    }
    async setSelectedAnswer({ idTrivia, idQuestion, idSelectedAnswer }: SetSelectedAnswer): Promise<boolean> {
        const sql = `call setSelectedAnswer(?, ?, ?)`;
        const result = await this.databaseHandler.getPool().query(sql, [ idTrivia, idQuestion, idSelectedAnswer ]);

        if (result.affectedRows === 0) {
            return false;
        }

        return true;
    }
    async getScore( idTrivia: string ): Promise<number|null> {
        const sql = `call getTriviaScore(?)`;
        const result = await this.databaseHandler.getPool().query(sql, [ idTrivia ]);

        if (result[ 0 ].length === 0) {
            return null;
        }

        return result[ 0 ][ 0 ].score;
    }

    async getUserScore(): Promise<UserScore[]|null> {
        const sql = `call getUserScore(?)`;
        const result = await this.databaseHandler.getPool().query(sql, [ 5 ]);
        if (result[ 0 ].length === 0) {
            return null;
        }

        return result[ 0 ];
    }

    async createUserScore(idUser: string, score: number): Promise<string|null> {
        const sql = `call createUserScore(?, ?, @last_id)`;
        await this.databaseHandler.getPool().query(sql, [ idUser, score ]);

        const sql2 = `SELECT @last_id AS insertId`;
        const result = await this.databaseHandler.getPool().query(sql2);
        return result[ 0 ];
    }

    async closeTrivia(idTrivia: string, idUser: string): Promise<boolean> {
        const sql = `call closeTrivia(?, ?)`;
        const result = await this.databaseHandler.getPool().query(sql, [ idTrivia, idUser ]);
        if (result.affectedRows === 0) {
            return false;
        }

        return true;
    }
}
