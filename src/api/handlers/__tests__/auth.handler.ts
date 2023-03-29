import questionCategoryRepository from "../../test-helpers/repository/question-category.repository.mock";
import triviaRepository from "../../test-helpers/repository/trivia.repository.mock";
import userRepositoryMock  from "../../test-helpers/repository/user.repository.mock";
import { TriviaRoute } from "../../routes/trivia.route";
import { ConfigService } from "../../services/config.service";
import { AuthHandler } from "../auth.handler";
import { CryptoHandler } from "../crypto.handler";
import { DatabaseMysqlHandler } from "../database/database.mysql.handler";
import { HttpUtilsHandler } from "../httpUtilsHandler";
import { QuestionCategoryHandler } from "../questionCategory.handler";
import { ServerHandler } from "../server.handler";
import { TriviaHandler } from "../trivia.handler";

const request = require('supertest')

const configService = new ConfigService();
const cryptoHandler = new CryptoHandler({
    configService
})
const httpUtilsHandler = new HttpUtilsHandler({
    configService
})
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
    })
    it('Should return 200 successful login', () => {
        return request(app).post('/api/auth/signup')
            .send(
                { 'userName': 'userName', 'ip': '116.117.12.15' }
            ).then((response: Response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                )
            })
    })
    it('Should return 400 user already exist with that name and another Ip', () => {
        return request(app).post('/api/auth/signup')
            .send(
                { 'userName': 'userNameDifferentIp', 'ip': '116.117.12.15' }
            ).expect(400);
    })
    it('Should return 200 successful login', () => {
        return request(app).post('/api/auth/signup')
            .send(
                { 'userName': 'newUserName', 'ip': '116.117.12.15' }
            ).then((response: Response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                    })
                )
            })
    })
});