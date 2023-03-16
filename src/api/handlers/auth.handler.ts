import { Request, Response } from 'express';
import { AuthHandlerConstructorInterface, AuthHandlerInterface } from '../interfaces/auth.handler.interface';
import { CreateUserModel } from '../interfaces/createUser.model';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';

export class AuthHandler implements AuthHandlerInterface {
    private userRepository: UserRepositoryInterface;
    constructor({ userRepository }: AuthHandlerConstructorInterface) {
        this.userRepository = userRepository;
        this.signUp = this.signUp.bind(this);
    }
    async signUp(request: Request, response: Response): Promise<any> {
        const { username, ip } = request.body;
        const userModel: CreateUserModel = {
            username: username,
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
                return response.status(200).send({
                    message: "Usuario creado correctamente",
                });
            }

            const { insertId } = await this.userRepository.createUser(userModel);

            return response.status(200).send({
                message: "Usuario creado correctamente",
                id: insertId
            });
        } catch (error) {
            console.log(error);
            return response.status(500).send({
                message: "Error interno por favor intenta nuevamente",
            });
        }
    }
}
