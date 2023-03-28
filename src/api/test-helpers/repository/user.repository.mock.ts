import { UserRepositoryInterface } from "../../interfaces/repository/user.repository.interface"

const searchUserByName = jest.fn(userModel => {
   return [];
})
const createUser = jest.fn(params => {
    return [];
})
const userRepositoryMock: UserRepositoryInterface = {
    searchUserByName,
    createUser
}

export default userRepositoryMock;
