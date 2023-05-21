import { RequestHandler, Response } from "express";
import { ConfigService } from "../../services/config.service";

export interface HttpUtilsHandlerConstructorInterface {
    configService: ConfigService;
}

export interface HttpUtilsHandlerInterface {
    validateFields: RequestHandler;
    sendBasicJsonResponse(res: Response, status: number, message: string): Response;
    generateJsonWebToken(userId: string): void;
    validateJsonWebToken: RequestHandler;
}
