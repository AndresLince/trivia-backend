import express, { Express } from 'express';
import { AuthRoute } from '../routes/auth.route';
import cors from 'cors';
import { ServerHandlerConstructorInterface } from '../interfaces/server.handler.interface';

export class ServerHandler {
    private authRoutes: AuthRoute;
    constructor({ authHandler, httpUtilsHandler }: ServerHandlerConstructorInterface) {
        this.authRoutes = new AuthRoute({ authHandler, httpUtilsHandler });
    }
    createServer(): Express {
        const app: Express = express();
        app.use(cors());
        app.use(express.json());

        app.use('/api/auth', this.authRoutes.createRoutes());

        return app;
    }
}
