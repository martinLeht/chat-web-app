import IReadWrite from "./IReadWrite";
import IUser from "../../models/interfaces/IUser";

interface IUserRepository extends IReadWrite<IUser> {
    findOneByEmail(email: string): Promise<IUser | undefined>;
    findOneByUsername(username: string): Promise<IUser | undefined>;
}

export default IUserRepository;