import { CreateUserModel } from '../interfaces/createUser.model';
import { DatabaseHandlerInterface } from '../interfaces/database.handler';
import { UserRepositoryConstructorInterface, UserRepositoryInterface } from '../interfaces/user.repository.interface';

export class UserRepositoryMysql implements UserRepositoryInterface {
    private databaseHandler: DatabaseHandlerInterface;
    constructor({ databaseMysqlHandler }: UserRepositoryConstructorInterface) {
        this.databaseHandler = databaseMysqlHandler;
    }
    async createUser({ username, ip}: CreateUserModel) {
        const sql = `call createUser(?,?, @last_id)`;
        //const algo = this.databaseHandler.getPool().query(sql, username, ip);
        const insertError = {error: false}
        this.databaseHandler.getPool().query(sql, [username, ip], (error: Error, results: any, fields: any) => {
            if (error) {
                console.log("error",error)
                insertError.error = true;
            }
        });

        console.log("pasa", insertError);
        const sql2 = `SELECT @last_id AS insertId`;
        return this.databaseHandler.getPool().query(sql2);
    }
}
