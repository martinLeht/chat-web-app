import { inject, injectable } from "inversify";
import TYPES from "../config/types";
import { ITempUserDTO } from "../dto/ITempUserDTO";
import ITempUser from "../models/interfaces/ITempUser";
import TempUser from "../models/TempUser";
import ITempUserRepository from "../repositories/interfaces/ITempUserRepository";
import ITempUserService from "./interfaces/ITempUserService";

@injectable()
class TempUserService implements ITempUserService {

    private tempUserRepository: ITempUserRepository;

    constructor(@inject(TYPES.ITempUserRepository) tempUserRepository: ITempUserRepository) {
        this.tempUserRepository = tempUserRepository;
    }

    public async findAllUsers(): Promise<ITempUserDTO[]> {
        let users: ITempUser[] | undefined = await this.tempUserRepository.findAll();

        if (users === undefined || users.length === 0) {
            return [];
        }

        const usersDto: ITempUserDTO[] = users.map(user => this.toDto(user));
        console.log("In service users to dto:");
        console.log(usersDto);
        return usersDto;
    }

    public async findUserById(id: string): Promise<ITempUserDTO | undefined> {
        const user: ITempUser | undefined = await this.tempUserRepository.findOneById(id);

        if (user === undefined) return undefined;

        const userDto: ITempUserDTO = this.toDto(user);
        return userDto;
    }

    public async findUserByUsername(username: string): Promise<ITempUserDTO | undefined> {
        const user: ITempUser | undefined = await this.tempUserRepository.findOneByUsername(username);

        if (user === undefined) return undefined;

        const userDto: ITempUserDTO = this.toDto(user);
        return userDto;
    }


    public async createUser(userDto: ITempUserDTO): Promise<ITempUserDTO | undefined> {
        let user: ITempUser | undefined = await this.tempUserRepository.findOneByUsername(userDto.username);

        if (user !== undefined) {
            return undefined;
        }
        
        let newUser: ITempUser | undefined = this.toEntity(userDto);
        newUser = await this.tempUserRepository.create(newUser);

        if (newUser === undefined) {
            return undefined;
        }

        const newUserDto: ITempUserDTO = this.toDto(newUser);
        return newUserDto;
    }

    public async updateUser(userDto: ITempUserDTO): Promise<boolean> {
        if (userDto.userId != undefined) {
            const userData: ITempUser = this.toEntity(userDto);
            const success: boolean = await this.tempUserRepository.update(userData.userId, userData);

            if (!success) {
                return false;
            }
            return true;
        }
        return false;
    }

    public async deleteUser(id: string): Promise<boolean> {
        const success: boolean = await this.tempUserRepository.delete(id);

        if (!success) {
            return false;
        }
        return true;
    }

    private toDto(user: ITempUser): ITempUserDTO {
        const userDto: ITempUserDTO = {
            userId: user.userId,
            username: user.username,
            creationDateTime: user.creationDateTime,
            updateDateTime: user.updateDateTime
        };

        return userDto;
    }

    private toEntity(userDto: ITempUserDTO): ITempUser {
        const user: ITempUser = new TempUser({
            username: userDto.username
        });

        return user;
    }

}

export default TempUserService;