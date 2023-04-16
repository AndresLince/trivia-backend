import { TriviaRepositoryInterface } from "../../interfaces/repository/trivia.repository.interface";

const create = jest.fn(triviaModel => {
    return [];
});
const search = jest.fn(triviaModel => {
    return [];
});
const addQuestionsToTrivia = jest.fn(triviaModel => {
    return [];
});
const getQuestion = jest.fn(triviaModel => {
    return [];
});
const setSelectedAnswer = jest.fn(triviaModel => {
    return [];
});
const getScore = jest.fn(triviaModel => {
    return [];
});
const triviaRepository: TriviaRepositoryInterface = {
    create,
    search,
    addQuestionsToTrivia,
    getQuestion,
    setSelectedAnswer,
    getScore,
};

export default triviaRepository;
