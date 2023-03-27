import { DatabaseHandlerInterface } from "../database.handler";

export interface UserRepositoryInterface {
    createUser: Function;
    searchUserByName: Function;
}

export interface UserRepositoryConstructorInterface {
    databaseMysqlHandler: DatabaseHandlerInterface;
}
