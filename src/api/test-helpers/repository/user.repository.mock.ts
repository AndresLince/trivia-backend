import { CreateUserModel } from "../../interfaces/createUser.model";
import { InsertModel, UserModel } from "../../interfaces/crud.responses.interface";
import { UserRepositoryInterface } from "../../interfaces/repository/user.repository.interface";

const searchUserByName = jest.fn(({ userName, ip }: CreateUserModel) => {
    const user: UserModel = {
        userName: userName,
        ip: ip,
        state: 1,
        idUser: 1
    };
    if (userName === 'userNameDifferentIp') {
        user.ip = '192.168.0.1';
    }
    if (userName === 'newUserName') {
        return Promise.resolve(null);
    }
    if (userName === 'exceptionUserName') {
        throw new Error('Exception on userName');
    }
    return Promise.resolve(user);
});
const createUser = jest.fn((createUserModel: CreateUserModel) => {
    const insertModel: InsertModel = {
        insertId: 'insertId'
    };
    return Promise.resolve(insertModel);
});
const userRepositoryMock: UserRepositoryInterface = {
    searchUserByName,
    createUser
};

export default userRepositoryMock;
