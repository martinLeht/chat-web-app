import express, { Application } from 'express';
import http, { Server } from 'http';
import helmet from 'helmet';
import cors from "cors";

import MongoDbConnectionService from './services/MongoDbConnectionService';
import { MONGO_URI } from './config/config';
import { Connection } from 'mongoose';
import IRoutes from './routes/interfaces/IRoutes';

import IRouter from './routes/interfaces/IRoutes';
import SocketService from './services/SocketService';
import { Container } from 'inversify';
import DIContainer from './config/DIContainer';
import TYPES from './config/types';
import TempUserRoutes from './routes/TempUserRoutes';

export default class App {

    public app: Application;
    private server: Server;
    private container: Container;
    private socketService: SocketService;

    constructor() {
        this.app = express();
        this.container = new DIContainer().getContainer();

        this.initMiddlewares();
        /* Fetch roters from DI container and initiate to application */
        const routes: IRouter[] = [
            this.container.get<TempUserRoutes>(TYPES.TempUserRoutes)
        ];
        this.initRoutes(routes);
        
        this.server = http.createServer(this.app);
        /* Initialize socket communication */
        this.socketService = this.container.get<SocketService>(TYPES.SocketService);
        this.socketService.initSocketServer(this.server);
    }

    private initRoutes(routes: IRoutes[]): void {
        routes.forEach((routes: IRoutes) => {
            routes.registerRoutes();
            this.app.use("/api", routes.getRouter());
        });
    }

    private initMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
    }

    private establishDbConnection(): void {
        if (MONGO_URI != undefined) {
            let dbConnection: Connection = MongoDbConnectionService.establishConnection(MONGO_URI);
            dbConnection.once("open", () => {
                console.log("Connected to database");
            });  
            dbConnection.on("error", () => {
                console.log("Error connecting to database");
            });
        } else {
            throw new Error("Mongo connection URI has to be defined");
        }
        
    }

    public startServer(port: number): void {
        this.server.listen(port ,() => {
            console.log(`Server started listening at localhost: ${port}`);
            this.establishDbConnection();
        });
    }
}