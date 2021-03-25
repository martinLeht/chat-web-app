import express, { Application, Router, Request, Response } from 'express';
import { json } from 'body-parser';
const expressSanitizer = require('express-sanitizer');
import http, { Server } from 'http';
import helmet from 'helmet';
import cors from "cors";

import MongoDbConnectionService from './services/MongoDbConnectionService';
import { MONGO_URI } from './config/config';
import { Connection } from 'mongoose';
import IRoutes from './routes/interfaces/IRoutes';

import { testRouter } from './routes/TestRouter';

export default class App {

    public app: Application;
    private server: Server;
    private router: Router;

    constructor(routes: IRoutes[]) {
        this.app = express();
        this.router = express.Router();

        this.initMiddlewares();
        this.initRoutes(routes);

        this.server = http.createServer(this.app);
    }

    private initMiddlewares(): void {
        this.app.use(json());
        this.app.use(expressSanitizer);
        this.app.use(cors());
        this.app.use(helmet());
    }

    private initRoutes(routes: IRoutes[]): void {
        /*
        routes.forEach((routes: IRoutes) => {
            routes.registerRoutes(routerTest);
        });
        */
        this.app.use("/api", testRouter);
        console.log(testRouter)
        //console.log(this.router.stack);
        console.log(this.app._router.stack);
        
    }

    private establishDbConnection(): void {
        if (MONGO_URI != undefined) {
            let dbConnection: Connection = MongoDbConnectionService.establishConnection(MONGO_URI);
            dbConnection.once("open", async () => {
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