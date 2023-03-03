import { DatabaseMysqlHandler } from '../handlers/database/database.mysql.handler';
import { CreateUserModel } from '../interfaces/createUser.model';
import { UserRepositoryConstructorInterface, UserRepositoryInterface } from '../interfaces/user.repository.interface';

export class UserRepositoryMysql implements UserRepositoryInterface {
    private databaseHandler: DatabaseMysqlHandler
    constructor({ databaseMysqlHandler }: UserRepositoryConstructorInterface) {
        this.databaseHandler = databaseMysqlHandler
    }
    async createUser(userCreateModel: CreateUserModel) {
        const sql = `call createUser(?, ?, ?, ?, ?, ?, @last_id)`;
        this.databaseHandler.getPool().query(sql, userCreateModel.username);
        const sql2 = `SELECT @last_id AS insertId`;
        return this.databaseHandler.getPool().query(sql2)
    }
}
