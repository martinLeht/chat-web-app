import express, { Application } from 'express';
import http, { Server } from 'http';
import helmet from 'helmet';
import cors from "cors";


import UserRoutes from './routes/UserRoutes';
import { Inject } from 'typescript-ioc';


export default class App {

    private app: Application;
    private server: Server;

    constructor(@Inject private userRoutes: UserRoutes) {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes();
        
        this.server = http.createServer(this.app);
    }

    private initMiddlewares(): void {
        this.app.use(cors());
        this.app.use(helmet());
    }

    private initRoutes(): void {
        this.app.use('/api', this.userRoutes.router);
    }

    public startServer(port: number): void {
        this.server.listen(port ,() => {
            console.log(`Server started listening at localhost: ${port}`);
        });
    }
}