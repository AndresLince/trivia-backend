import { TriviaRepositoryInterface } from "../../interfaces/repository/trivia.repository.interface";

const create = jest.fn(triviaModel => {
    return [];
})
const triviaRepository: TriviaRepositoryInterface = {
    create
}

export default triviaRepository;
