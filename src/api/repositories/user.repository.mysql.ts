import { CreateUserModel } from '../interfaces/createUser.model';
import { InsertModel, UserModel } from '../interfaces/crud.responses.interface';
import { DatabaseHandlerInterface } from '../interfaces/database.handler';
import { UserRepositoryConstructorInterface, UserRepositoryInterface } from '../interfaces/user.repository.interface';

export class UserRepositoryMysql implements UserRepositoryInterface {
    private databaseHandler: DatabaseHandlerInterface;
    constructor({ databaseMysqlHandler }: UserRepositoryConstructorInterface) {
        this.databaseHandler = databaseMysqlHandler;
    }
    async createUser({ username, ip }: CreateUserModel): Promise<InsertModel> {
        const sql = `call createUser(?,?, @last_id)`;
        await this.databaseHandler.getPool().query(sql, [ username, ip ]);

        const sql2 = `SELECT @last_id AS insertId`;
        const result = await this.databaseHandler.getPool().query(sql2);
        return result[ 0 ];
    }
    async searchUserByName({ username }: CreateUserModel): Promise<UserModel | null> {
        const sql = `call searchUserByName(?)`;
        const result = await this.databaseHandler.getPool().query(sql, [username]);

        if (result[0].length === 0) {
            return null;
        }
        let user: UserModel;

        const { idUser, ip, userName, state } = result[0][0];
        user = {
            userName: userName,
            ip: ip,
            state: state,
            idUser: idUser
        };

        return user;
    }
}
