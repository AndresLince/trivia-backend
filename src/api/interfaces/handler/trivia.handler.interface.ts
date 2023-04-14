import { RequestHandler } from "express";
import { TriviaRepositoryInterface } from "../repository/trivia.repository.interface";
import { CryptoHandlerInterface } from "./crypto.handler.interface";
import { HttpUtilsHandlerInterface } from "./http.handler.interface";

export interface TriviaHandlerConstructorInterface {
    triviaRepository: TriviaRepositoryInterface;
    httpUtilsHandler: HttpUtilsHandlerInterface;
    cryptoHandler: CryptoHandlerInterface;
}

export interface TriviaHandlerInterface {
    create: RequestHandler;
    getQuestion: RequestHandler;
    setSelectedAnswer: RequestHandler;
    getSummary: RequestHandler;
}
