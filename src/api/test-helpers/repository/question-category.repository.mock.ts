import { QuestionCategory } from "../../interfaces/model/question-category.model";
import { QuestionCategoryRepositoryInterface } from "../../interfaces/questionCategory.repository.interface";

const searchAll = jest.fn(() => {
    const questionCategory: QuestionCategory[] = [
        { idQuestionCategory: '1', name: 'Category 1' },
        { idQuestionCategory: '2', name: 'Category 2' },
        { idQuestionCategory: '3', name: 'Category 3' },
    ]
    return Promise.resolve(questionCategory);
});
const questionCategoryRepository: QuestionCategoryRepositoryInterface = {
    searchAll
};

export default questionCategoryRepository;
