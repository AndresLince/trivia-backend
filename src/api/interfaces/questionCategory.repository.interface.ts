import { DatabaseHandlerInterface } from "./database.handler";

export interface QuestionCategoryRepositoryInterface {
    searchAll: Function;
}

export interface RepositoryConstructorInterface {
    databaseHandlerInterface: DatabaseHandlerInterface;
}
