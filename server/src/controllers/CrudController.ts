

export abstract class CrudController {

    public abstract async findAll(req: Request, res: Response): void;
    public abstract async findById(req: Request, res: Response): void;
    public abstract async update(req: Request, res: Response): void;
    public abstract async delete(req: Request, res: Response): void;
}