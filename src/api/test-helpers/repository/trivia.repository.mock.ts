import { SetSelectedAnswer } from "../../interfaces/model/set-selected-answer.model";
import { TriviaRepositoryInterface } from "../../interfaces/repository/trivia.repository.interface";
import { questionDataMock } from "../data/question.data";

const create = jest.fn(triviaModel => {
    return {
        insertId: 1
    }
});
const search = jest.fn(idUser => {
    if (idUser === 'exceptionUserId') {
        throw new Error('Exception on search');
    }

    if (idUser === 'validUserIdWithOutTrivia') {
        return null;
    }
    return {
        idTrivia: 1,
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
const getScore = jest.fn(triviaModel => {
    return [];
});
const closeTrivia = jest.fn(triviaModel => {
    return true;
});
const getUserScore = jest.fn(triviaModel => {
    return true;
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
