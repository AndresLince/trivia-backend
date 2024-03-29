import { InsertModel } from "../../interfaces/crud.responses.interface";
import { AddQuestionsToTrivia } from "../../interfaces/model/add-question-to-trivia.model";
import { CreateTrivia } from "../../interfaces/model/create-trivia.model";
import { SetSelectedAnswer } from "../../interfaces/model/set-selected-answer.model";
import { TriviaModel } from "../../interfaces/model/trivia.model";
import { TriviaRepositoryInterface } from "../../interfaces/repository/trivia.repository.interface";
import { questionDataMock } from "../data/question.data";
import { userScoresMock } from "../data/userScores.data";

const create = jest.fn((createTrivia: CreateTrivia) => {
    if (createTrivia.idUser === 'exceptionUserId') {
        throw new Error('Exception on create');
    }
    const inserModel: InsertModel = {
        insertId: '1'
    };
    return Promise.resolve(inserModel);
});
const search = jest.fn((idUser: string) => {
    if (idUser === 'exceptionUserId') {
        throw new Error('Exception on search');
    }

    if (idUser === 'validUserIdWithOutTrivia') {
        return Promise.resolve(null);
    }
    const triviaModel: TriviaModel = {
        idTrivia: '12',
        idUser: idUser,
        idQuestionCategory: '1'
    };
    return Promise.resolve(triviaModel);
});
const addQuestionsToTrivia = jest.fn((addQuestionsToTrivia: AddQuestionsToTrivia) => {
    if (!addQuestionsToTrivia.idTrivia) {
        return Promise.resolve(false);
    }
    return Promise.resolve(true);
});
const getQuestion = jest.fn((idTrivia: string) => {
    if (!idTrivia) {
        return Promise.resolve(null);
    }
    if (idTrivia === '1') {
        throw new Error('Exception on getQuestion');
    }
    return Promise.resolve(questionDataMock);
});
const setSelectedAnswer = jest.fn(({ idTrivia, idQuestion, idSelectedAnswer }: SetSelectedAnswer) => {
    if (idQuestion === '') {
        throw new Error('Exception on setSelectedAnswer');
    }
    if (idTrivia === '') {
        return Promise.resolve(false);
    }
    if (idSelectedAnswer === '') {
        return Promise.resolve(false);
    }
    return Promise.resolve(true);
});
const getScore = jest.fn((idTrivia: string) => {
    if (idTrivia === '') {
        return Promise.resolve(null);
    }
    return Promise.resolve(100);
});
const closeTrivia = jest.fn((idTrivia: string, idUser: string) => {
    if (idUser === 'invalidUserCloseTrivia') {
        return Promise.resolve(false);
    }
    if (idUser === 'exceptionUserId') {
        throw new Error('Exception on closeTrivia');
    }
    return Promise.resolve(true);
});
const getUserScore = jest.fn(() => {
    return Promise.resolve(userScoresMock);
});
const createUserScore = jest.fn((idUser: string, score: number) => {
    if (idUser === '') {
        throw new Error('Exception on createUserScore');
    }
    if (score === null) {
        throw new Error('Exception on createUserScore');
    }
    return Promise.resolve('1');
});
const triviaRepository: TriviaRepositoryInterface = {
    create,
    search,
    addQuestionsToTrivia,
    getQuestion,
    setSelectedAnswer,
    getScore,
    closeTrivia,
    getUserScore,
    createUserScore,
};

export default triviaRepository;
