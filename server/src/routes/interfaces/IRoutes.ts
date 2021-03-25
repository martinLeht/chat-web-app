import { Router } from "express";

interface IRoutes {
    registerRoutes(router: Router): void;
}

export default IRoutes;