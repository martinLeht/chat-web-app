import express, { Application } from 'express';
import http, { Server } from 'http';
import helmet from 'helmet';
import cors from "cors";


export default class App {

    private app: Application;
    private server: Server;

    constructor() {
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
        
    }

    public startServer(): void {
        this.server.listen(this.app.get('port'),() => {
            console.log(`Server started listening at localhost:${this.app.get('port')}`);
        });
    }
}