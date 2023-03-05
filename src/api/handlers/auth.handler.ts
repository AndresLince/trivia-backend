import { Request, Response } from 'express';
import { AuthHandlerConstructorInterface } from '../interfaces/auth.handler.interface';
import { CreateUserModel } from '../interfaces/createUser.model';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';

export class AuthHandler {
    private userRepository: UserRepositoryInterface;
    constructor({ userRepository }: AuthHandlerConstructorInterface) {
        this.userRepository = userRepository
        this.signUp = this.signUp.bind(this)
    }
    signUp(request: Request, response: Response): void {
        const userModel: CreateUserModel = {
            username: "username",
            ip: "ip",
        }
        let createdUser = this.userRepository.createUser(userModel);
        response.status(200).send({
            message: "Usuario logueado correctamente"
        });
    }
}
