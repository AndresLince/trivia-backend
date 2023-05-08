import { InsertModel } from "../crud.responses.interface";
import { DatabaseHandlerInterface } from "../database.handler";
import { AddQuestionsToTrivia } from "../model/add-question-to-trivia.model";
import { CreateTrivia } from "../model/create-trivia.model";

export interface TriviaRepositoryInterface {
    create(createTrivia: CreateTrivia): Promise<InsertModel>;
    addQuestionsToTrivia(addQuestionsToTrivia: AddQuestionsToTrivia): Promise<boolean>;
    search: Function;
    getQuestion: Function;
    setSelectedAnswer: Function;
    getScore: Function;
    closeTrivia: Function;
    getUserScore: Function;
    createUserScore: Function;
}

export interface TriviaConstructorInterface{
    databaseHandler: DatabaseHandlerInterface;
}
