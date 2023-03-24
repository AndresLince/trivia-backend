import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { AuthHandlerInterface } from "./auth.handler.interface";
import { QuestionCategoryHandlerInterface } from "./questionCategory.handler.interface";

export interface ServerHandlerConstructorInterface {
    authHandler: AuthHandlerInterface;
    httpUtilsHandler: HttpUtilsHandler;
    questionCategoryHandler: QuestionCategoryHandlerInterface;
}
