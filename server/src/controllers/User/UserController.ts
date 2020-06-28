import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import { Inject } from "typescript-ioc";
import UserRepository from "../../repositories/UserRepository";
import { IUser } from "../../models/interfaces/IUser";
import { UserDTO } from "../../dto/UserDTO";

export default class UserController extends CrudController {

    constructor(@Inject private userRepository: UserRepository) {
        super();
    }
    
    public async findAll(req: Request, res: Response): Promise<void> {
        const users: IUser[] | undefined = await this.userRepository.findAll();

        if (users === undefined) {
            res.json({
                err: "No users found"
            });
        }
        res.json({
            users: users
        });
    }    
    
    public async findById(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        const user: IUser | undefined = await this.userRepository.findOneById(id);

        if (user === undefined) {
            res.json({
                err: "No user found with id: " + id
            });
        }
        res.json({
            user: user
        });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const username: string = req.body.userData.username;
        const email: string = req.body.userData.username;
        const password: string = req.body.userData.username;

        if (password === undefined) {
            res.json({
                err: "You need to provide a password!"
            });
        } else if (email === undefined) {
            res.json({
                err: "You need to provide a email address!"
            });
        } else if (username === undefined) {
            res.json({
                err: "You need to provide a username!"
            });
        }

        const userDto: UserDTO = {
            username: username,
            email: email,
            password: password
        };


        const success: boolean = await this.userRepository.create(userDto);

        if (!success) {
            res.json({
                err: "Something went wrong on creation"
            });
        }
        res.json({
            message: "Successfully created a user!"
        });
    }

    public async update(req: Request, res: Response): Promise<void> {
        res.json({
            err: "update Method not implemented."
        });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        res.json({
            err: "delete Method not implemented."
        });
    }

    
}