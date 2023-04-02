import { AuthHandlerInterface } from "./auth.handler.interface";
import { HttpUtilsHandlerInterface } from "./handler/http.handler.interface";

export interface AuthRouteConstructorInterface {
    authHandler: AuthHandlerInterface;
    httpUtilsHandler: HttpUtilsHandlerInterface
}
