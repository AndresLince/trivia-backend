import { RequestHandler } from "express";
import { HttpUtilsHandler } from "../../handlers/httpUtilsHandler";
import { TriviaRepositoryInterface } from "../repository/trivia.repository.interface";
import { CryptoHandlerInterface } from "./crypto.handler.interface";

export interface TriviaHandlerConstructorInterface {
    triviaRepository: TriviaRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandler;
    cryptoHandler: CryptoHandlerInterface
}

export interface TriviaHandlerInterface {
    create: RequestHandler;
}
