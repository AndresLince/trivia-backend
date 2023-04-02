import { HttpUtilsHandlerInterface } from "../../interfaces/handler/http.handler.interface";
import { validationResult } from 'express-validator';

const validateJsonWebToken = jest.fn((request, response, next) => {
    const token = request.header('x-token');
    if (!token) {
        return response.status(401).json();
    }
    if (token === 'invalidToken') {
        return response.status(401).json();
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
const generateJsonWebToken = jest.fn(token => {
    return '';
});
const sendBasicJsonResponse = jest.fn(token => {
    return [];
});
const httpUtilsHandler: HttpUtilsHandlerInterface = {
    validateJsonWebToken,
    validateFields,
    generateJsonWebToken,
    sendBasicJsonResponse,
};

export default httpUtilsHandler;