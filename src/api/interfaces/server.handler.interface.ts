import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { AuthHandlerInterface } from "./auth.handler.interface";

export interface ServerHandlerConstructorInterface {
    authHandler: AuthHandlerInterface;
    httpUtilsHandler: HttpUtilsHandler
}
