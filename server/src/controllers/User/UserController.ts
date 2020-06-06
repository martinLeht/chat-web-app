import { CrudController } from "../CrudController";
import { Request, Response } from "express";

export default class UserController extends CrudController {
    
    public findAll(req: Request, res: Response): void {
        res.json({
            err: "findAll Method not implemented"
        });
    }    
    
    public findById(req: Request, res: Response): void {
        res.json({
            err: "findById Method not implemented."
        });
    }

    public create(req: Request, res: Response): void {
        res.json({
            err: "create Method not implemented."
        });
    }

    public update(req: Request, res: Response): void {
        res.json({
            err: "update Method not implemented."
        });
    }

    public delete(req: Request, res: Response): void {
        res.json({
            err: "delete Method not implemented."
        });
    }

    
}