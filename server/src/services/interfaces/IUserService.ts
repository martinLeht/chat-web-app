import { isUndefined } from "util";
import { UserDTO } from "../../dto/UserDTO";

interface IUserService {
    findAllUsers(): Promise<UserDTO[]>;
    findUserById(id: number): Promise<UserDTO | undefined>;
    findUserByEmail(email: string): Promise<UserDTO | undefined>;
    findUserByUsername(username: string): Promise<UserDTO | undefined>;
    createUser(userDto: UserDTO): Promise<any>;
    updateUser(userDto: UserDTO): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
}

export default IUserService;