import { DatabaseMysqlHandler } from "../handlers/database/database.mysql.handler";

export interface UserRepositoryInterface {
    createUser: Function;
}

export interface UserRepositoryConstructorInterface {
    databaseMysqlHandler: DatabaseMysqlHandler;
}