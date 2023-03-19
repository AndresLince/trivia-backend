import { CreateUserModel } from '../interfaces/createUser.model';
import { InsertModel, UserModel } from '../interfaces/crud.responses.interface';
import { DatabaseHandlerInterface } from '../interfaces/database.handler';
import { UserRepositoryConstructorInterface, UserRepositoryInterface } from '../interfaces/user.repository.interface';

export class UserRepositoryMysql implements UserRepositoryInterface {
    private databaseHandler: DatabaseHandlerInterface;
    constructor({ databaseMysqlHandler }: UserRepositoryConstructorInterface) {
        this.databaseHandler = databaseMysqlHandler;
    }
    async createUser({ userName, ip }: CreateUserModel): Promise<InsertModel> {
        const sql = `call createUser(?,?, @last_id)`;
        await this.databaseHandler.getPool().query(sql, [ userName, ip ]);

        const sql2 = `SELECT @last_id AS insertId`;
        const result = await this.databaseHandler.getPool().query(sql2);
        return result[ 0 ];
    }
    async searchUserByName({ userName }: CreateUserModel): Promise<UserModel | null> {
        const sql = `call searchUserByName(?)`;
        const result = await this.databaseHandler.getPool().query(sql, [userName]);

        if (result[0].length === 0) {
            return null;
        }
        let user: UserModel;

        const userDb = result[0][0];
        user = {
            userName: userDb.userName,
            ip: userDb.ip,
            state: userDb.state,
            idUser: userDb.idUser
        };

        return user;
    }
}
