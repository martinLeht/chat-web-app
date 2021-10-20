import { Container } from 'inversify';
import TempUserController from '../controllers/TempUser/TempUserController';
import ITempUserRepository from '../repositories/interfaces/ITempUserRepository';
import TempUserRepository from '../repositories/TempUserRepository';
import TempUserRoutes from '../routes/TempUserRoutes';
import UserRoutes from '../routes/UserRoutes';
import ITempUserService from '../services/interfaces/ITempUserService';
import SocketService from '../services/SocketService';
import TempUserService from '../services/TempUserService';
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
        this.container.bind<TempUserRoutes>(TYPES.TempUserRoutes).to(TempUserRoutes);
    }

    private bindControllers(): void {
        this.container.bind<TempUserController>(TYPES.TempUserController).to(TempUserController);
    }

    private bindServices(): void {
        this.container.bind<SocketService>(TYPES.SocketService).to(SocketService);
        this.container.bind<ITempUserService>(TYPES.ITempUserService).to(TempUserService);
    }

    private bindRepositories(): void {
        this.container.bind<ITempUserRepository>(TYPES.ITempUserRepository).to(TempUserRepository).inSingletonScope();
    }

    public getContainer(): Container {
        return this.container;
    }
}

export default DIContainer;