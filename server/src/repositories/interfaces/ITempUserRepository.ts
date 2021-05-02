import IReadWrite from "./IReadWrite";
import ITempUser from "../../models/interfaces/ITempUser";

interface ITempUserRepository extends IReadWrite<ITempUser> {
    findOneByUsername(username: string): Promise<ITempUser | undefined>;
    deleteByUsername(username: string): Promise<boolean>;
}

export default ITempUserRepository;