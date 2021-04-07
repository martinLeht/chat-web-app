import express, { Request, Response, Router } from "express";
import asyncHandler from 'express-async-handler';
import { injectable, inject } from "inversify";
import TYPES from "../config/types";
import UserController from '../controllers/User/UserController';
import IRoutes from "./interfaces/IRoutes";

@injectable()
class UserRoutes implements IRoutes {

    private router: Router;
    private userController: UserController;

    constructor(@inject(TYPES.UserController) userController: UserController) {
        this.userController = userController;
        this.router = express.Router();
    }

    public registerRoutes(): void {
        this.router.get('/users', asyncHandler(async (req: Request, res: Response) => await this.userController.findAll(req, res)));
        this.router.get('/users/:id', asyncHandler(async (req: Request, res: Response) => await this.userController.findById(req, res)));
        this.router.post('/users', asyncHandler(async (req: Request, res: Response) => await this.userController.create(req, res)));
        this.router.put('/users/:id', asyncHandler(async (req: Request, res: Response) => await this.userController.update(req, res)));
        this.router.delete('/users/:id', asyncHandler(async (req: Request, res: Response) => await this.userController.delete(req, res)));
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default UserRoutes;