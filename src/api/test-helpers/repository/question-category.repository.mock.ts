import { QuestionCategoryRepositoryInterface } from "../../interfaces/questionCategory.repository.interface";

const searchAll = jest.fn(questionCategoryModel => {
   return [
       { idQuestionCategory: 1, name: 'Category 1' },
       { idQuestionCategory: 2, name: 'Category 2' },
       { idQuestionCategory: 3, name: 'Category 3' },
   ];
});
const questionCategoryRepository: QuestionCategoryRepositoryInterface = {
    searchAll
};

export default questionCategoryRepository;
