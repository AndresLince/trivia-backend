import { RequestHandler } from "express";
import { ConfigService } from "../../services/config.service";

export interface HttpUtilsHandlerConstructorInterface {
    configService: ConfigService;
}

export interface HttpUtilsHandlerInterface {
    validateFields: RequestHandler;
    sendBasicJsonResponse: Function;
    generateJsonWebToken: Function;
    validateJsonWebToken: RequestHandler;
}
