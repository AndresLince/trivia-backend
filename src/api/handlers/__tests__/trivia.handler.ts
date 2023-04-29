import { questionDataMock } from "../../test-helpers/data/question.data";
import serverHandler from "../../test-helpers/handler/server.handler.mock";
const request = require('supertest');

const app = serverHandler.createServer();
describe('Trivia handler create tests', () => {
    it('Should return 401 Unauthorized', () => {
        return request(app).post('/api/trivia').expect(401);
    });
    it('Should return 200 Successful', () => {
        return request(app).post('/api/trivia').set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { 'idQuestionCategory': '1'}
        )
        .then((response: Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    idTrivia: expect.any(String),
                })
            ),
            expect(response.status).toBe(200);
        });
    });
    it('Should return 200 Successful', () => {
        return request(app).post('/api/trivia').set(
            { 'x-token': 'mytokenuserwithouttrivia' }
        ).send(
            { 'idQuestionCategory': '1'}
        )
        .then((response: Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    idTrivia: expect.any(String),
                })
            ),
            expect(response.status).toBe(200);
        });
    });
    it('Should return 500 Internal server error', () => {
        return request(app).post('/api/trivia').set(
            { 'x-token': 'exceptionToken' }
        ).send(
            { 'idQuestionCategory': '1'}
        ).then((response: Response) => {
            expect(response.status).toBe(500);
        });
    });
    it('Should return 400 Bad Request', () => {
        return request(app).post('/api/trivia').set(
            { 'x-token': 'mytokennewuser' }
        ).then((response: Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    errors: expect.any(Object),
                })
            ),
            expect(response.status).toBe(400);
        });
    });
});
describe('Trivia handler update answer tests', () => {
    const serviceRoute = '/api/trivia/answer';
    it('Should return 401 Unauthorized', () => {
        return request(app).put(serviceRoute).expect(401);
    });

    it('Should return 200 Successful', () => {
        return request(app).put(serviceRoute).set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { idTrivia: 'f6c2', idQuestion: 'f6c2', idSelectedAnswer: 'f6c2' }
        ).then((response: Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.any(String),
                })
            ),
            expect(response.status).toBe(200);
        });
    });

    it('Should return 404 Not Found', () => {
        return request(app).put(serviceRoute).set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { idTrivia: 1, idQuestion: 'f6c2', idSelectedAnswer: 'f6c2' }
        ).then((response: Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.any(String),
                })
            ),
            expect(response.status).toBe(404);
        });
    });

    it('Should return 500 Internal Server Error', () => {
        return request(app).put(serviceRoute).set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { idTrivia: 1, idQuestion: 1, idSelectedAnswer: 'f6c2' }
        ).then((response: Response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: expect.any(String),
                })
            ),
            expect(response.status).toBe(500);
        });
    });
});

describe('Trivia handler get question tests', () => {
    const validIdTrivia = 'f6c2';
    const invalidIdTrivia = '1';
    const serviceRoute = '/api/trivia/question/';
    it('Should return 401 Unauthorized', () => {
        return request(app).get(serviceRoute + validIdTrivia).expect(401);
    });

    it('Should return 200 Successful', () => {
        return request(app).get(serviceRoute + validIdTrivia).set(
            { 'x-token': 'mytokennewuser' }
        ).then((response: Response) => {
            expect(response.body).toStrictEqual(
                {
                    data: questionDataMock
                }
            )
            expect(response.status).toBe(200);
        });
    });

    it('Should return 404 Not Found', () => {
        return request(app).get(serviceRoute + invalidIdTrivia).set(
            { 'x-token': 'mytokenuserwithouttrivia' }
        ).then((response: Response) => {
            expect(response.body).toStrictEqual(
                {
                    data: {}
                }
            )
            expect(response.status).toBe(404);
        });
    });
});
