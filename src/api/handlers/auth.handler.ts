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
            const { insertId } = await this.userRepository.createUser(userModel);

            return response.status(200).send({
                message: "Usuario logueado correctamente",
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
