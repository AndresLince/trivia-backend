import { CreateUserModel } from "../createUser.model";
import { InsertModel } from "../crud.responses.interface";
import { DatabaseHandlerInterface } from "../database.handler";

export interface UserRepositoryInterface {
    createUser(createUserModel: CreateUserModel): Promise<InsertModel>;
    searchUserByName: Function;
}

export interface UserRepositoryConstructorInterface {
    databaseMysqlHandler: DatabaseHandlerInterface;
}
