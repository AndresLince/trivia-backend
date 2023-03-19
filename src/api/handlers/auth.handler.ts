import { Request, Response } from 'express';
import { AuthHandlerConstructorInterface, AuthHandlerInterface } from '../interfaces/auth.handler.interface';
import { CreateUserModel } from '../interfaces/createUser.model';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';
import { HttpUtilsHandler } from './httpUtilsHandler';

export class AuthHandler implements AuthHandlerInterface {
    private userRepository: UserRepositoryInterface;
    private httpUtilsHandler: HttpUtilsHandler;
    constructor({ userRepository, httpUtilsHandler }: AuthHandlerConstructorInterface) {
        this.userRepository = userRepository;
        this.httpUtilsHandler = httpUtilsHandler;
        this.signUp = this.signUp.bind(this);
    }
    async signUp(request: Request, response: Response): Promise<any> {
        const { userName, ip } = request.body;
        const userModel: CreateUserModel = {
            userName: userName,
            ip: ip,
        };
        try {
            const user = await this.userRepository.searchUserByName(userModel);
            if (user && user.ip !== userModel.ip) {
                return response.status(404).send({
                    message: "Ya existe un usuario con ese nombre",
                });
            }

            if (user && user.ip === userModel.ip) {
                //Crear token
                const token = await this.httpUtilsHandler.generateJsonWebToken(user.idUser);
                return response.status(200).send({
                    message: "Usuario creado correctamente",
                    token
                });
            }

            const { insertId } = await this.userRepository.createUser(userModel);
            const token = await this.httpUtilsHandler.generateJsonWebToken(insertId);

            return response.status(200).send({
                message: "Usuario creado correctamente",
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
