import { Request, Response, Router } from "express";
import asyncHandler from 'express-async-handler';
import { injectable, inject } from "inversify";
import TYPES from "../config/types";
import UserController from '../controllers/User/UserController';
import IRoutes from "./interfaces/IRoutes";

@injectable()
class UserRoutes implements IRoutes {

    private userController: UserController;

    constructor(@inject(TYPES.UserController) userController: UserController) {
        this.userController = userController;
    }

    public registerRoutes(router: Router): void {
        router.get('/test', (req: Request, res: Response) => this.userController.findTest(req, res));
        router.get('/users', asyncHandler(async (req: Request, res: Response) => await this.userController.findAll(req, res)));
        router.get('/users/:id', asyncHandler(async (req: Request, res: Response) => await this.userController.findById(req, res)));
        router.post('/users', asyncHandler(async (req: Request, res: Response) => await this.userController.create(req, res)));
        router.put('/users/:id', asyncHandler(async (req: Request, res: Response) => await this.userController.update(req, res)));
        router.delete('/users/:id', asyncHandler(async (req: Request, res: Response) => await this.userController.delete(req, res)));
    }
}

export default UserRoutes;