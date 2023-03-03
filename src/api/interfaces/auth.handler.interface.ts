import { UserRepositoryInterface } from "./user.repository.interface";

export interface AuthHandlerConstructorInterface {
    userRepository: UserRepositoryInterface;
}