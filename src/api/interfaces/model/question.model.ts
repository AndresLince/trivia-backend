import { Answer } from "./answer.model";

export interface Question {
    idQuestion: string;
    description: string;
    answers: Answer[];
}
