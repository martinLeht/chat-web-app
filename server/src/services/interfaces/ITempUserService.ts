import { ITempUserDTO } from "../../dto/ITempUserDTO";

interface ITempUserService {
    findAllUsers(): Promise<ITempUserDTO[]>;
    findUserById(id: string): Promise<ITempUserDTO | undefined>;
    findUserByUsername(username: string): Promise<ITempUserDTO | undefined>;
    createUser(tempUserDto: ITempUserDTO): Promise<ITempUserDTO | undefined>;
    updateUser(tempUserDto: ITempUserDTO): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
    deleteUserByUsername(username: string): Promise<boolean>
}

export default ITempUserService;