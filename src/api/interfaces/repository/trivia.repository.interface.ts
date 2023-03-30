import { DatabaseHandlerInterface } from "../database.handler";

export interface TriviaRepositoryInterface {
    create: Function;
    search: Function;
}

export interface TriviaConstructorInterface{
    databaseHandler: DatabaseHandlerInterface;
}
