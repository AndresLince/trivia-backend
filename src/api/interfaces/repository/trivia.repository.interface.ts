import { InsertModel } from "../crud.responses.interface";
import { DatabaseHandlerInterface } from "../database.handler";
import { AddQuestionsToTrivia } from "../model/add-question-to-trivia.model";
import { CreateTrivia } from "../model/create-trivia.model";
import { Question } from "../model/question.model";
import { SetSelectedAnswer } from "../model/set-selected-answer.model";
import { TriviaModel } from "../model/trivia.model";

export interface TriviaRepositoryInterface {
    create(createTrivia: CreateTrivia): Promise<InsertModel>;
    addQuestionsToTrivia(addQuestionsToTrivia: AddQuestionsToTrivia): Promise<boolean>;
    search(idUser: string): Promise<TriviaModel | null>;
    getQuestion(idTrivia: string): Promise<Question | null>;
    setSelectedAnswer({ idTrivia, idQuestion, idSelectedAnswer }: SetSelectedAnswer): Promise<boolean>;
    getScore(idTrivia: string): Promise<number | null>;
    closeTrivia: Function;
    getUserScore: Function;
    createUserScore: Function;
}

export interface TriviaConstructorInterface{
    databaseHandler: DatabaseHandlerInterface;
}
