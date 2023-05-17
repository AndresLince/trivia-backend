import { DatabaseHandlerInterface } from '../interfaces/database.handler';
import { QuestionCategory } from '../interfaces/model/question-category.model';
import { QuestionCategoryRepositoryInterface, RepositoryConstructorInterface } from '../interfaces/questionCategory.repository.interface';

export class QuestionCategoryRepositoryMysql implements QuestionCategoryRepositoryInterface {
    private databaseHandler: DatabaseHandlerInterface;
    constructor({ databaseHandler }: RepositoryConstructorInterface) {
        this.databaseHandler = databaseHandler;
    }
    async searchAll(): Promise<QuestionCategory[] | null> {
        const sql = `call searchQuestionCategories()`;
        const result = await this.databaseHandler.getPool().query(sql);

        if (result[ 0 ].length === 0) {
            return null;
        }

        return result[ 0 ];
    }
}
