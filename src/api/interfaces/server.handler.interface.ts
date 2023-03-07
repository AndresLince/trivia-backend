import { AuthHandlerInterface } from "./auth.handler.interface";

export interface DatabaseHandlerConstructorInterface {
    getPool: Function;
}

export interface ServerHandlerConstructorInterface {
    authHandler: AuthHandlerInterface;
}