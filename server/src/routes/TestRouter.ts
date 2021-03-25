import express, { Request, Response } from "express";

export const testRouter = express.Router();

testRouter.get("/test", (req: Request, res: Response) => {
    res.json({
        err: "No users found"
    });
});

testRouter.get("/test/:id", (req: Request, res: Response) => {
    res.json({
        err: "No users found with ID"
    });
});
