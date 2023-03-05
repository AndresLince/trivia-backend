import express, { Express } from 'express';
import { AuthRoute } from '../routes/auth.route';
import cors from 'cors';

export class ServerHandler {
    private authRoutes: AuthRoute;
    constructor({ userRepository }: any) {
        this.authRoutes = new AuthRoute(userRepository);
    }
    createServer(): Express {
        const app: Express = express();
        app.use(cors());
        app.use(express.json());

        app.use('/api/auth', this.authRoutes.createRoutes());

        return app;
    }
}
