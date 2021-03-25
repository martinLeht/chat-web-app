import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class CrudController {

    public abstract findAll(req: Request, res: Response): void;
    public abstract findById(req: Request, res: Response): void;
    public abstract create(req: Request, res: Response): void;
    public abstract update(req: Request, res: Response): void;
    public abstract delete(req: Request, res: Response): void;
}