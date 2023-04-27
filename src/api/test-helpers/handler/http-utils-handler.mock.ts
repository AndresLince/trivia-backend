import { HttpUtilsHandlerInterface } from "../../interfaces/handler/http.handler.interface";
import { validationResult } from 'express-validator';
import { Response } from 'express';

const validateJsonWebToken = jest.fn((request, response, next) => {
    const token = request.header('x-token');
    request.body.userId = 'validUserId';
    if (!token) {
        return response.status(401).json();
    }
    if (token === 'invalidToken') {
        return response.status(401).json();
    }
    if (token === 'exceptionToken') {
        request.body.userId = 'exceptionUserId';
    }
    if (token === 'mytokenuserwithouttrivia') {
        request.body.userId = 'validUserIdWithOutTrivia';
    }

    next();
});
const validateFields = jest.fn((request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            errors: errors.mapped()
        });
    }

    next();
});
const generateJsonWebToken = jest.fn(userId => {
    if (userId === 'exceptionUserId') {
        throw new Error('Exception on userId');
    }
    return '';
});
const sendBasicJsonResponse = jest.fn((res: Response, status: number, message: string ) => {
    return res.status(status).json({
        message: message,
    });
});
const httpUtilsHandler: HttpUtilsHandlerInterface = {
    validateJsonWebToken,
    validateFields,
    generateJsonWebToken,
    sendBasicJsonResponse,
};

export default httpUtilsHandler;
