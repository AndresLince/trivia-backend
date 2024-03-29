import { Request, Response } from 'express';
import { AuthHandlerConstructorInterface, AuthHandlerInterface } from '../interfaces/auth.handler.interface';
import { CreateUserModel } from '../interfaces/createUser.model';
import { HttpUtilsHandlerInterface } from '../interfaces/handler/http.handler.interface';
import { UserRepositoryInterface } from '../interfaces/repository/user.repository.interface';
import { USER_MESSAGES } from '../interfaces/messages/user-messages';

export class AuthHandler implements AuthHandlerInterface {
    private userRepository: UserRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandlerInterface;
    constructor({ userRepository, httpUtilsHandler }: AuthHandlerConstructorInterface) {
        this.userRepository = userRepository;
        this.httpUtilsHandler = httpUtilsHandler;
        this.signUp = this.signUp.bind(this);
        this.renewJsonWebToken = this.renewJsonWebToken.bind(this);
    }
    async signUp(request: Request, response: Response): Promise<Response> {
        const { userName, ip } = request.body;
        const userModel: CreateUserModel = {
            userName: userName,
            ip: ip,
        };
        try {
            const user = await this.userRepository.searchUserByName(userModel);
            if (user && user.ip !== userModel.ip) {
                return response.status(400).send({
                    message: "Ya existe un usuario con ese nombre",
                });
            }

            if (user && user.ip === userModel.ip) {
                //Crear token
                const token = await this.httpUtilsHandler.generateJsonWebToken(user.idUser);
                return response.status(200).send({
                    message: USER_MESSAGES.USER_CREATED,
                    token
                });
            }

            const { insertId } = await this.userRepository.createUser(userModel);
            const token = await this.httpUtilsHandler.generateJsonWebToken(insertId);

            return response.status(200).send({
                message: USER_MESSAGES.USER_CREATED,
                token
            });
        } catch (error) {
            console.log(error);
            return response.status(500).send({
                message: "Error interno por favor intenta nuevamente",
            });
        }
    }
    async renewJsonWebToken(request: Request, response: Response): Promise<Response> {
        const { userId } = request.body;

        try {
            const token = await this.httpUtilsHandler.generateJsonWebToken(userId);

            return response.status(200).send({
                token
            });
        } catch (error) {
            console.log(error);
            return response.status(500).send({
                message: "Error interno por favor intenta nuevamente",
            });
        }
    }
}
