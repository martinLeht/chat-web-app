import express, { Application } from 'express';
import http, { Server } from 'http';
import helmet from 'helmet';
import cors from "cors";


import UserRoutes from './routes/UserRoutes';


export default class App {

    private app: Application;
    private server: Server;
    
    private userRoutes: UserRoutes;

    constructor() {
        this.app = express();

        this.userRoutes = new UserRoutes();

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