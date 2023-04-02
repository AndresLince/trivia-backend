import { HttpUtilsHandlerInterface } from "../handler/http.handler.interface";
import { TriviaHandlerInterface } from "../handler/trivia.handler.interface";

export interface TriviaRouteConstructorInterface {
    triviaHandler: TriviaHandlerInterface;
    httpUtilsHandler: HttpUtilsHandlerInterface
}
