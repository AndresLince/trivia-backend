import { RequestHandler } from "express";
import { CryptoHandlerInterface } from "./handler/crypto.handler.interface";
import { HttpUtilsHandlerInterface } from "./handler/http.handler.interface";
import { QuestionCategoryRepositoryInterface } from "./questionCategory.repository.interface";

export interface QuestionCategoryHandlerConstructorInterface {
    questionCategoryRepository: QuestionCategoryRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandlerInterface;
    cryptoHandler: CryptoHandlerInterface
}

export interface QuestionCategoryHandlerInterface {
    getAll: RequestHandler;
}
