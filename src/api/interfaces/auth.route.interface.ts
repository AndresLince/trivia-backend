import { UserRepositoryInterface } from "./user.repository.interface";

export interface AuthRouteConstructorInterface {
    userRepository: UserRepositoryInterface;
}