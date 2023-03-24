import { RequestHandler } from "express";
import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { QuestionCategoryRepositoryInterface } from "./questionCategory.repository.interface";

export interface QuestionCategoryHandlerConstructorInterface {
    questionCategoryRepository: QuestionCategoryRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandler
}

export interface QuestionCategoryHandlerInterface {
    getAll: RequestHandler;
}
