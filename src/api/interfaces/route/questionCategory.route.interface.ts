import { HttpUtilsHandler } from "../../handlers/httpUtilsHandler";
import { QuestionCategoryHandlerInterface } from "../questionCategory.handler.interface";

export interface QuestionCategoryRouteConstructorInterface {
    questionCategoryHandler: QuestionCategoryHandlerInterface;
    httpUtilsHandler: HttpUtilsHandler
}
