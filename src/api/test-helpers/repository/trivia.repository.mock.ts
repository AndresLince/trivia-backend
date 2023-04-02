import { TriviaRepositoryInterface } from "../../interfaces/repository/trivia.repository.interface";

const create = jest.fn(triviaModel => {
    return [];
});
const search = jest.fn(triviaModel => {
    return [];
});
const triviaRepository: TriviaRepositoryInterface = {
    create,
    search
};

export default triviaRepository;
