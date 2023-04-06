import { DatabaseHandlerInterface } from "../database.handler";

export interface TriviaRepositoryInterface {
    create: Function;
    addQuestionsToTrivia: Function;
    search: Function;
    getQuestion: Function;
}

export interface TriviaConstructorInterface{
    databaseHandler: DatabaseHandlerInterface;
}
