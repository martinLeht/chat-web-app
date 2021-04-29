import { Container } from 'inversify';
import TempUserController from '../controllers/TempUser/TempUserController';
import UserController from '../controllers/User/UserController';
import ITempUserRepository from '../repositories/interfaces/ITempUserRepository';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import TempUserRepository from '../repositories/TempUserRepository';
import UserRepository from '../repositories/UserRepository';
import TempUserRoutes from '../routes/TempUserRoutes';
import UserRoutes from '../routes/UserRoutes';
import ITempUserService from '../services/interfaces/ITempUserService';
import IUserService from '../services/interfaces/IUserService';
import TempUserService from '../services/TempUserService';
import UserService from '../services/UserService';
import TYPES from './types';

class DIContainer {

    private container: Container;

    constructor() {
        this.container = new Container();
        this.bindRoutes();
        this.bindControllers();
        this.bindServices();
        this.bindRepositories();
    }

    private bindRoutes(): void {
        this.container.bind<UserRoutes>(TYPES.UserRoutes).to(UserRoutes);
        this.container.bind<TempUserRoutes>(TYPES.TempUserRoutes).to(TempUserRoutes);
    }

    private bindControllers(): void {
        this.container.bind<UserController>(TYPES.UserController).to(UserController);
        this.container.bind<TempUserController>(TYPES.TempUserController).to(TempUserController);
    }

    private bindServices(): void {
        this.container.bind<IUserService>(TYPES.IUserService).to(UserService);
        this.container.bind<ITempUserService>(TYPES.ITempUserService).to(TempUserService);
    }

    private bindRepositories(): void {
        //this.container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
        this.container.bind<ITempUserRepository>(TYPES.ITempUserRepository).to(TempUserRepository).inSingletonScope();
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default DIContainer;