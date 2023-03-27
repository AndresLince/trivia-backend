import { HttpUtilsHandler } from "../../handlers/httpUtilsHandler";
import { TriviaHandlerInterface } from "../handler/trivia.handler.interface";

export interface TriviaRouteConstructorInterface {
    triviaHandler: TriviaHandlerInterface;
    httpUtilsHandler: HttpUtilsHandler
}
