import { RequestHandler } from "express";
import { HttpUtilsHandler } from "../handlers/httpUtilsHandler";
import { CryptoHandlerInterface } from "./handler/crypto.handler.interface";
import { QuestionCategoryRepositoryInterface } from "./questionCategory.repository.interface";

export interface QuestionCategoryHandlerConstructorInterface {
    questionCategoryRepository: QuestionCategoryRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandler;
    cryptoHandler: CryptoHandlerInterface
}

export interface QuestionCategoryHandlerInterface {
    getAll: RequestHandler;
}
