import express, { Express } from 'express';
import { AuthRoute } from '../routes/auth.route';
import cors from 'cors';
import { ServerHandlerConstructorInterface } from '../interfaces/server.handler.interface';
import { QuestionCategoryRoute } from '../routes/questionCategory.route';
import { RouteInterface } from '../interfaces/route/route.interface';

export class ServerHandler {
    private authRoutes: AuthRoute;
    private questionCategoryRoute: QuestionCategoryRoute;
    private triviaRoute: RouteInterface;
    constructor({
        authHandler,
        httpUtilsHandler,
        questionCategoryHandler,
        triviaRoute
    }: ServerHandlerConstructorInterface) {
        this.authRoutes = new AuthRoute({ authHandler, httpUtilsHandler });
        this.questionCategoryRoute = new QuestionCategoryRoute({ questionCategoryHandler, httpUtilsHandler });
        this.triviaRoute = triviaRoute;
    }
    createServer(): Express {
        const app: Express = express();
        app.use(cors());
        app.use(express.json());

        app.use('/api/auth', this.authRoutes.createRoutes());
        app.use('/api/question-category', this.questionCategoryRoute.createRoutes());
        app.use('/api/trivia', this.triviaRoute.createRoutes());

        return app;
    }
}
