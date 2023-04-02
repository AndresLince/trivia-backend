import { AuthHandlerInterface } from "./auth.handler.interface";
import { HttpUtilsHandlerInterface } from "./handler/http.handler.interface";
import { QuestionCategoryHandlerInterface } from "./questionCategory.handler.interface";
import { RouteInterface } from "./route/route.interface";

export interface ServerHandlerConstructorInterface {
    authHandler: AuthHandlerInterface;
    httpUtilsHandler: HttpUtilsHandlerInterface;
    questionCategoryHandler: QuestionCategoryHandlerInterface;
    triviaRoute: RouteInterface;
}
