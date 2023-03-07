import { DatabaseHandlerInterface } from "./database.handler";

export interface UserRepositoryInterface {
    createUser: Function;
}

export interface UserRepositoryConstructorInterface {
    databaseMysqlHandler: DatabaseHandlerInterface;
}
