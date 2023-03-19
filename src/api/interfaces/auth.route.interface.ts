import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { AuthHandlerInterface } from "./auth.handler.interface";

export interface AuthRouteConstructorInterface {
    authHandler: AuthHandlerInterface;
    httpUtilsHandler: HttpUtilsHandler
}
