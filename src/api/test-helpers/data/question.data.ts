import { Question } from "../../interfaces/model/question.model";

export const questionDataMock: Question = {
    idQuestion: '1',
    description: 'First question',
    answers: [
        {
            idAnswer: '1',
            description: 'First answer'
        },
        {
            idAnswer: '2',
            description: 'Second answer'
        },
        {
            idAnswer: '3',
            description: 'Third answer'
        },
        {
            idAnswer: '4',
            description: 'Four answer'
        },
    ]
};