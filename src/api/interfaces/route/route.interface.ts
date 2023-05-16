import { Router } from "express";

export interface RouteInterface {
    createRoutes(): Router;
}
