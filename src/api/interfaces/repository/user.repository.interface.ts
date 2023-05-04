import { CreateUserModel } from "../createUser.model";
import { InsertModel, UserModel } from "../crud.responses.interface";
import { DatabaseHandlerInterface } from "../database.handler";

export interface UserRepositoryInterface {
    createUser(createUserModel: CreateUserModel): Promise<InsertModel>;
    searchUserByName(createUserModel: CreateUserModel): Promise<UserModel | null>;
}

export interface UserRepositoryConstructorInterface {
    databaseMysqlHandler: DatabaseHandlerInterface;
}
