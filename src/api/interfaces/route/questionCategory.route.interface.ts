import { HttpUtilsHandlerInterface } from "../handler/http.handler.interface";
import { QuestionCategoryHandlerInterface } from "../questionCategory.handler.interface";

export interface QuestionCategoryRouteConstructorInterface {
    questionCategoryHandler: QuestionCategoryHandlerInterface;
    httpUtilsHandler: HttpUtilsHandlerInterface
}
