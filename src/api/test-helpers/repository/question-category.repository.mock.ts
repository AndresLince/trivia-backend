import { QuestionCategoryRepositoryInterface } from "../../interfaces/questionCategory.repository.interface";

const searchAll = jest.fn(questionCategoryModel => {
   return [];
})
const questionCategoryRepository: QuestionCategoryRepositoryInterface = {
    searchAll
}

export default questionCategoryRepository;
