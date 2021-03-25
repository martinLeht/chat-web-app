import { Container } from 'inversify';
import UserController from '../controllers/User/UserController';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import UserRepository from '../repositories/UserRepository';
import UserRoutes from '../routes/UserRoutes';
import IUserService from '../services/interfaces/IUserService';
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
    }

    private bindControllers(): void {
        this.container.bind<UserController>(TYPES.UserController).to(UserController);
    }

    private bindServices(): void {
        this.container.bind<IUserService>(TYPES.IUserService).to(UserService);
    }

    private bindRepositories(): void {
        this.container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope();
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default DIContainer;