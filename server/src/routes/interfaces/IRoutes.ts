import { Router } from "express";

interface IRoutes {
    registerRoutes(): void;
    getRouter(): Router;
}

export default IRoutes;