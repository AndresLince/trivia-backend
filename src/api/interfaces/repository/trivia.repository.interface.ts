import { InsertModel } from "../crud.responses.interface";
import { DatabaseHandlerInterface } from "../database.handler";
import { AddQuestionsToTrivia } from "../model/add-question-to-trivia.model";
import { CreateTrivia } from "../model/create-trivia.model";
import { TriviaModel } from "../model/trivia.model";

export interface TriviaRepositoryInterface {
    create(createTrivia: CreateTrivia): Promise<InsertModel>;
    addQuestionsToTrivia(addQuestionsToTrivia: AddQuestionsToTrivia): Promise<boolean>;
    search(idUser: string): Promise<TriviaModel | null>;
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
