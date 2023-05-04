import { InsertModel } from "../../interfaces/crud.responses.interface";
import { CreateTrivia } from "../../interfaces/model/create-trivia.model";
import { SetSelectedAnswer } from "../../interfaces/model/set-selected-answer.model";
import { TriviaRepositoryInterface } from "../../interfaces/repository/trivia.repository.interface";
import { questionDataMock } from "../data/question.data";
import { userScoresMock } from "../data/userScores.data";

const create = jest.fn(({ idUser, idQuestionCategory }: CreateTrivia) => {
    const inserModel: InsertModel = {
        insertId: '1'
    };
    return Promise.resolve(inserModel);
});
const search = jest.fn(idUser => {
    if (idUser === 'exceptionUserId') {
        throw new Error('Exception on search');
    }

    if (idUser === 'validUserIdWithOutTrivia') {
        return null;
    }
    return {
        idTrivia: 12,
        idUser: idUser,
        idQuestionCategory: 1
    };
});
const addQuestionsToTrivia = jest.fn(triviaModel => {
    return [];
});
const getQuestion = jest.fn((idTrivia: string) => {
    if (!idTrivia) {
        return null;
    }
    if (idTrivia === '1') {
        throw new Error('Exception on getQuestion');
    }
    return questionDataMock;
});
const setSelectedAnswer = jest.fn(({ idTrivia, idQuestion }: SetSelectedAnswer) => {
    if (idQuestion === '') {
        throw new Error('Exception on setSelectedAnswer');
    }
    if (idTrivia === '') {
        return false;
    }
    return true;
});
const getScore = jest.fn(idTrivia => {
    if (idTrivia === '') {
        return null;
    }
    return 100;
});
const closeTrivia = jest.fn((idTrivia, userId) => {
    if (userId === 'invalidUserCloseTrivia') {
        return false;
    }
    if (userId === 'exceptionUserId') {
        throw new Error('Exception on closeTrivia');
    }
    return true;
});
const getUserScore = jest.fn(() => {
    return userScoresMock;
});
const createUserScore = jest.fn(triviaModel => {
    return true;
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
