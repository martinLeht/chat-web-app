import express, { Request, Response, Router } from "express";
import UserController from '../controllers/User/UserController';

export default class UserRoutes {

    router: Router;
    private userController: UserController;

    constructor() {
        this.userController = new UserController();
        this.router = express.Router();

        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.get('/users', async (req: Request, res: Response) => this.userController.findAll(req, res));
        this.router.get('/users/:id', async (req: Request, res: Response) => this.userController.findById(req, res));
        this.router.post('/users', async (req: Request, res: Response) => this.userController.create(req, res));
        this.router.put('/users/:id', async (req: Request, res: Response) => this.userController.update(req, res));
        this.router.delete('/users/:id', async (req: Request, res: Response) => this.userController.delete(req, res));
    }

}