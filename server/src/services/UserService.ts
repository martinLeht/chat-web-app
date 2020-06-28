import UserRepository from "../repositories/UserRepository";
import { Inject, Singleton } from "typescript-ioc";
import { UserDTO } from "../dto/UserDTO";
import { IUser } from "../models/interfaces/IUser";
import User from "../models/User";

@Singleton
export default class UserService {

    constructor(@Inject private userRepository: UserRepository) {
        
    }

    public async findAllUsers(): Promise<UserDTO[]> {
        let users: IUser[] = await this.userRepository.findAll();

        if (users.length === 0) {
            return [];
        }

        const usersDto: UserDTO[] = users.map(user => this.toDto(user));
        console.log("In service users to dto:");
        console.log(usersDto);
        return usersDto;
    }

    public async findUserById(id: number) {
        const user: IUser | undefined = await this.userRepository.findOneById(id);

        if (user === undefined) return undefined;

        const userDto: UserDTO = this.toDto(user);
        return userDto;
    }

    public async findUserByEmail(email: string) {
        const user: IUser | undefined = await this.userRepository.findOneByEmail(email);

        if (user === undefined) return undefined;

        const userDto: UserDTO = this.toDto(user);
        return userDto;
    }


    public async findUserByUsername(username: string) {
        const user: IUser | undefined = await this.userRepository.findOneByUsername(username);

        if (user === undefined) return undefined;

        const userDto: UserDTO = this.toDto(user);
        return userDto;
    }


    public async createUser(userDto: UserDTO): Promise<any> {
        let user: IUser | undefined = await this.userRepository.findOneByEmail(userDto.email);

        if (user !== undefined) {
            return { err: "There is a user with the provided email already."};
        }

        user = await this.userRepository.findOneByUsername(userDto.username);
        if (user !== undefined) {
            return { err: "There is a user with the provided username already."};
        }

        const newUser: IUser = this.toPersistence(userDto);
        const success: boolean = await this.userRepository.create(newUser);

        if (!success) {
            return { err: "Something went wrong on creation"};
        }

        return { message: "Successfully created user!"};
    }

    public async updateUser(userDto: UserDTO): Promise<boolean> {
        const success: boolean = await this.userRepository.update(userDto.userId, userDto);

        if (!success) {
            return false;
        }
        return true;
    }

    public async deleteUser(id: number): Promise<boolean> {
        const success: boolean = await this.userRepository.delete(id);

        if (!success) {
            return false;
        }
        return true;
    }

    private toDto(user: IUser): UserDTO {
        const userDto: UserDTO = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            password: user.password,
            creationDateTime: user.creationDateTime,
            updatedDateTime: user.updatedDateTime
        };

        return userDto;
    }

    private toPersistence(user: UserDTO): IUser {
        const userModel: IUser = new User({
            username: user.username,
            email: user.email,
            password: user.password
        });

        return userModel;
    }
}