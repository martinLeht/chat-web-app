import express, { Application, Router, Request, Response } from 'express';
import http, { Server } from 'http';
import helmet from 'helmet';
import cors from "cors";

import MongoDbConnectionService from './services/MongoDbConnectionService';
import { MONGO_URI } from './config/config';
import { Connection } from 'mongoose';
import IRoutes from './routes/interfaces/IRoutes';
import SocketService from './services/SocketService';
import { Socket } from 'dgram';

export default class App {

    public app: Application;
    private server: Server;
    private socketService: SocketService;

    constructor(routes: IRoutes[]) {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes(routes);
        this.establishDbConnection();

        this.server = http.createServer(this.app);
        
        this.socketService = new SocketService(this.server);
        this.socketService.initSocket();
    }

    private initMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
    }

    private initRoutes(routes: IRoutes[]): void {
        routes.forEach((routes: IRoutes) => {
            routes.registerRoutes();
            this.app.use("/api", routes.getRouter());
        });
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
            //this.establishDbConnection();
        });
    }
}