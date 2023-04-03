import { InsertModel } from '../interfaces/crud.responses.interface';
import { DatabaseHandlerInterface } from '../interfaces/database.handler';
import { AddQuestionsToTrivia } from '../interfaces/model/add-question-to-trivia.model';
import { CreateTrivia } from '../interfaces/model/create-trivia.model';
import { TriviaModel } from '../interfaces/model/trivia.model';
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
    async addQuestionsToTrivia({ idTrivia, idQuestionCategory }: AddQuestionsToTrivia): Promise<Boolean> {
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
        let trivia: TriviaModel;

        const triviaDb = result[ 0 ][ 0 ];
        trivia = {
            idTrivia: triviaDb.idTrivia,
            idUser: triviaDb.idUser,
            idQuestionCategory: triviaDb.idQuestionCategory
        };

        return trivia;
    }
}
