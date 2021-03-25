import { injectable, inject } from "inversify";
import TYPES from "../../config/types";
import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import IUser from "../../models/interfaces/IUser";
import { UserDTO } from "../../dto/UserDTO";
import IUserService from "../../services/interfaces/IUserService";


@injectable()
export default class UserController extends CrudController {

    private userService: IUserService;

    constructor(@inject(TYPES.IUserService) userService: IUserService) {
        super();
        this.userService = userService;
    }

    public findTest(req: Request, res: Response): void {
        res.json({
            err: "No users found"
        });
    }    
    
    public async findAll(req: Request, res: Response): Promise<void> {
        const users: UserDTO[] | undefined = await this.userService.findAllUsers();

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
        const user: UserDTO | undefined = await this.userService.findUserById(id);

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


        const success: boolean = await this.userService.createUser(userDto);

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

        const userData: UserDTO = req.body

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