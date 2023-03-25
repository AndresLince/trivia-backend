import { RequestHandler } from "express";
import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { UserRepositoryInterface } from "./user.repository.interface";

export interface AuthHandlerConstructorInterface {
    userRepository: UserRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandler
}

export interface AuthHandlerInterface {
    signUp: RequestHandler;
    renewJsonWebToken: RequestHandler
}
