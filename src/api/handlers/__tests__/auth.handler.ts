import questionCategoryRepository from "../../test-helpers/repository/question-category.repository.mock";
import triviaRepository from "../../test-helpers/repository/trivia.repository.mock";
import userRepositoryMock  from "../../test-helpers/repository/user.repository.mock";
import { TriviaRoute } from "../../routes/trivia.route";
import { ConfigService } from "../../services/config.service";
import { AuthHandler } from "../auth.handler";
import { CryptoHandler } from "../crypto.handler";
import { QuestionCategoryHandler } from "../questionCategory.handler";
import { ServerHandler } from "../server.handler";
import { TriviaHandler } from "../trivia.handler";
import httpUtilsHandler from "../../test-helpers/handler/http-utils-handler.mock";

const request = require('supertest');

const configService = new ConfigService();
const cryptoHandler = new CryptoHandler({
    configService
});
const authHandler = new AuthHandler({
    userRepository: userRepositoryMock,
    httpUtilsHandler: httpUtilsHandler,
});
const triviaHandler = new TriviaHandler({
    triviaRepository,
    httpUtilsHandler,
    cryptoHandler
});
const questionCategoryHandler = new QuestionCategoryHandler({
    questionCategoryRepository: questionCategoryRepository,
    httpUtilsHandler: httpUtilsHandler,
    cryptoHandler
});

const triviaRoute = new TriviaRoute({ triviaHandler, httpUtilsHandler });

const serverHandler = new ServerHandler({
    authHandler,
    httpUtilsHandler,
    questionCategoryHandler,
    triviaRoute
});
const app = serverHandler.createServer();
describe('Login tests', () => {
    it('Should return 400 bad request No body parameters', () => {
        return request(app).post('/api/auth/signup').expect(400);
    });
    it('Should return 200 successful login', () => {
        return request(app).post('/api/auth/signup')
            .send(
                { 'userName': 'userName', 'ip': '116.117.12.15' }
            ).then((response: Response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                ),
                expect(response.status).toBe(200);
            });
    });
    it('Should return 400 user already exist with that name and another Ip', () => {
        return request(app).post('/api/auth/signup')
            .send(
                { 'userName': 'userNameDifferentIp', 'ip': '116.117.12.15' }
            ).expect(400);
    });
    it('Should return 200 successful login', () => {
        return request(app).post('/api/auth/signup')
            .send(
                { 'userName': 'newUserName', 'ip': '116.117.12.15' }
            ).then((response: Response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                );
            });
    });
});
describe('renew json web token', () => {
    it('Should return 401 Unauthorized', () => {
        return request(app).get('/api/auth/renew').expect(401);
    });
    it('Should return 200 successful renew token', () => {
        return request(app).get('/api/auth/renew').set(
            { 'x-token': 'mytokennewuser' }
        ).then((response: Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    token: expect.any(String),
                })
            ),
            expect(response.status).toBe(200);
        });
    });
    it('Should return 401 Unauthorized', () => {
        return request(app).get('/api/auth/renew').set(
            { 'x-token': 'invalidToken' }
        ).then((response: Response) => {
            expect(response.status).toBe(401);
        });
    });
    it('Should return 500 Internal server error', () => {
        return request(app).get('/api/auth/renew').set(
            { 'x-token': 'exceptionToken' }
        ).then((response: Response) => {
            expect(response.status).toBe(500);
        });
    });
});
