import express, { Application } from 'express';
const expressSanitizer = require('express-sanitizer');
import http, { Server } from 'http';
import helmet from 'helmet';
import cors from "cors";
import { Inject } from 'typescript-ioc';

import UserRoutes from './routes/UserRoutes';


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
        this.app.use(expressSanitizer);
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