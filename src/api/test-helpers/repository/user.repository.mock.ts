import { UserRepositoryInterface } from "../../interfaces/repository/user.repository.interface"

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
    return user;
})
const createUser = jest.fn(userModel => {
    return [];
})
const userRepositoryMock: UserRepositoryInterface = {
    searchUserByName,
    createUser
}

export default userRepositoryMock;
