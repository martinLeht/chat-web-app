import express, { Request, Response, Router } from "express";
import UserController from '../controllers/User/UserController';
import { Inject } from "typescript-ioc";

export default class UserRoutes {

    router: Router;

    constructor(@Inject private userController: UserController) {
        this.router = express.Router();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.get('/users', async (req: Request, res: Response) => await this.userController.findAll(req, res));
        this.router.get('/users/:id', async (req: Request, res: Response) => await this.userController.findById(req, res));
        this.router.post('/users', async (req: Request, res: Response) => await this.userController.create(req, res));
        this.router.put('/users/:id', async (req: Request, res: Response) => await this.userController.update(req, res));
        this.router.delete('/users/:id', async (req: Request, res: Response) => await this.userController.delete(req, res));
    }

}