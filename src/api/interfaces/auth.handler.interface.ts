import { RequestHandler } from "express";
import { UserRepositoryInterface } from "./user.repository.interface";

export interface AuthHandlerConstructorInterface {
    userRepository: UserRepositoryInterface;
}

export interface AuthHandlerInterface {
    signUp: RequestHandler;
}
