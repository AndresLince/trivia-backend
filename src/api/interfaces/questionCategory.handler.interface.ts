import { RequestHandler } from "express";
import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { UserRepositoryInterface } from "./user.repository.interface";

export interface QuestionCategoryHandlerConstructorInterface {
    userRepository: UserRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandler
}

export interface QuestionCategoryHandlerInterface {
    getAll: RequestHandler;
}
