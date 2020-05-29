import { CrudController } from "../CrudController";


export default class UserController extends CrudController {

    public async findAll(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }    
    
    public async findById(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async update(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    public async delete(req: Request, res: Response): Promise<any> {
        throw new Error("Method not implemented.");
    }

    
}