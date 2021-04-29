import { injectable, inject } from "inversify";
import TYPES from "../../config/types";
import { CrudController } from "../CrudController";
import { Request, Response } from "express";
import { ITempUserDTO } from "../../dto/ITempUserDTO";
import ITempUserService from "../../services/interfaces/ITempUserService";


@injectable()
class TempUserController extends CrudController {

    private tempUserService: ITempUserService;

    constructor(@inject(TYPES.ITempUserService) tempUserService: ITempUserService) {
        super();
        this.tempUserService = tempUserService;
    }
    
    public async findAll(req: Request, res: Response): Promise<void> {
        const users: ITempUserDTO[] | undefined = await this.tempUserService.findAllUsers();

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
        const id: string = req.params.id;
        const user: ITempUserDTO | undefined = await this.tempUserService.findUserById(id);

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

        if (username === undefined) {
            res.json({
                err: "You need to provide a username!"
            });
        }

        const TempuserDto: ITempUserDTO = {
            username: username
        };


        const success: boolean = await this.tempUserService.createUser(TempuserDto);

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

        const userData: ITempUserDTO = req.body

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

export default TempUserController;