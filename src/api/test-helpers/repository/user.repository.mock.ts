import { CreateUserModel } from "../../interfaces/createUser.model";
import { InsertModel } from "../../interfaces/crud.responses.interface";
import { UserRepositoryInterface } from "../../interfaces/repository/user.repository.interface";

const searchUserByName = jest.fn(userModel => {
    const user = {
        userName: userModel.userName,
        ip: userModel.ip,
        state: 1,
        idUser: 1
    };
    if (userModel.userName === 'userNameDifferentIp') {
        user.ip = '192.168.0.1';
    }
    if (userModel.userName === 'newUserName') {
        return null;
    }
    if (userModel.userName === 'exceptionUserName') {
        throw new Error('Exception on userName');
    }
    return user;
});
const createUser = jest.fn((createUserModel: CreateUserModel) => {
    const insertModel: InsertModel = {
        insertId: 'insertId'
    };
    return Promise.resolve(insertModel)
});
const userRepositoryMock: UserRepositoryInterface = {
    searchUserByName,
    createUser
};

export default userRepositoryMock;
