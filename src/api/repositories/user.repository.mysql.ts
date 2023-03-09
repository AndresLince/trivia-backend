import { CreateUserModel } from '../interfaces/createUser.model';
import { InsertModel } from '../interfaces/crud.responses.interface';
import { DatabaseHandlerInterface } from '../interfaces/database.handler';
import { UserRepositoryConstructorInterface, UserRepositoryInterface } from '../interfaces/user.repository.interface';

export class UserRepositoryMysql implements UserRepositoryInterface {
    private databaseHandler: DatabaseHandlerInterface;
    constructor({ databaseMysqlHandler }: UserRepositoryConstructorInterface) {
        this.databaseHandler = databaseMysqlHandler;
    }
    async createUser({ username, ip }: CreateUserModel): Promise<InsertModel> {
        const sql = `call createUser(?,?, @last_id)`;
        await this.databaseHandler.getPool().query(sql, [username, ip]);

        const sql2 = `SELECT @last_id AS insertId`;
        const result = await this.databaseHandler.getPool().query(sql2);
        return result[0];
    }
}
