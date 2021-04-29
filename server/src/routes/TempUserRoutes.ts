import express, { Request, Response, Router } from "express";
import asyncHandler from 'express-async-handler';
import { injectable, inject } from "inversify";
import TYPES from "../config/types";
import TempUserController from '../controllers/TempUser/TempUserController';
import IRoutes from "./interfaces/IRoutes";

@injectable()
class TempUserRoutes implements IRoutes {

    private router: Router;
    private tempUserController: TempUserController;

    constructor(@inject(TYPES.TempUserController) tempUserController: TempUserController) {
        this.tempUserController = tempUserController;
        this.router = express.Router();
    }

    public registerRoutes(): void {
        this.router.get('/tempusers', asyncHandler(async (req: Request, res: Response) => await this.tempUserController.findAll(req, res)));
        this.router.get('/tempusers/:id', asyncHandler(async (req: Request, res: Response) => await this.tempUserController.findById(req, res)));
        this.router.post('/tempusers', asyncHandler(async (req: Request, res: Response) => await this.tempUserController.create(req, res)));
        this.router.put('/tempusers/:id', asyncHandler(async (req: Request, res: Response) => await this.tempUserController.update(req, res)));
        this.router.delete('/tempusers/:id', asyncHandler(async (req: Request, res: Response) => await this.tempUserController.delete(req, res)));
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default TempUserRoutes;