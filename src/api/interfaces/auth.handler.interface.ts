import { RequestHandler } from "express";
import { HttpUtilsHandlerInterface } from "./handler/http.handler.interface";
import { UserRepositoryInterface } from "./repository/user.repository.interface";

export interface AuthHandlerConstructorInterface {
    userRepository: UserRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandlerInterface
}

export interface AuthHandlerInterface {
    signUp: RequestHandler;
    renewJsonWebToken: RequestHandler
}
