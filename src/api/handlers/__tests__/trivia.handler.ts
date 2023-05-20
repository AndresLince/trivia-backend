import { questionDataMock } from "../../test-helpers/data/question.data";
import { userScoresMock } from "../../test-helpers/data/userScores.data";
import serverHandler from "../../test-helpers/handler/server.handler.mock";
import request from 'supertest';

const app = serverHandler.createServer();
describe('Trivia handler create tests', () => {
    it('Should return 401 Unauthorized', async() => {
        const response = await request(app).post('/api/trivia');

        expect(response.status).toBe(401);
    });
    it('Should return 200 Successful', async() => {
        const response = await request(app).post('/api/trivia').set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { 'idQuestionCategory': '1' }
        );

        expect(response.body).toStrictEqual(
            expect.objectContaining({
                idTrivia: expect.any(String),
            })
        );
        expect(response.status).toBe(200);
    });
    it('Should return 200 Successful', async () => {
        const response = await request(app).post('/api/trivia').set(
            { 'x-token': 'mytokenuserwithouttrivia' }
        ).send(
            { 'idQuestionCategory': '1' }
        );

        expect(response.body).toEqual(
            expect.objectContaining({
                idTrivia: expect.any(String),
            })
        );
        expect(response.status).toBe(200);
    });
    it('Should return 500 Internal server error', async() => {
        const response = await request(app).post('/api/trivia').set(
            { 'x-token': 'exceptionToken' }
        ).send(
            { 'idQuestionCategory': '1' }
        );

        expect(response.status).toBe(500);
    });
    it('Should return 400 Bad Request', async() => {
        const response = await request(app).post('/api/trivia').set(
            { 'x-token': 'mytokennewuser' }
        );

        expect(response.body).toEqual(
            expect.objectContaining({
                errors: expect.any(Object),
            })
        );
        expect(response.status).toBe(400);
    });
});
describe('Trivia handler update answer tests', () => {
    const serviceRoute = '/api/trivia/answer';
    it('Should return 401 Unauthorized', async() => {
        const response = await request(app).put(serviceRoute);

        expect(response.status).toBe(401);
    });

    it('Should return 200 Successful', async() => {
        const response = await request(app).put(serviceRoute).set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { idTrivia: 'f6c2', idQuestion: 'f6c2', idSelectedAnswer: 'f6c2' }
        );

        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
            })
        ),
        expect(response.status).toBe(200);
    });

    it('Should return 404 Not Found', async() => {
        const response = await request(app).put(serviceRoute).set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { idTrivia: 1, idQuestion: 'f6c2', idSelectedAnswer: 'f6c2' }
        );

        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
            })
        );
        expect(response.status).toBe(404);
    });

    it('Should return 500 Internal Server Error', async() => {
        const response = await request(app).put(serviceRoute).set(
            { 'x-token': 'mytokennewuser' }
        ).send(
            { idTrivia: 1, idQuestion: 1, idSelectedAnswer: 'f6c2' }
        );

        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
            })
        );
        expect(response.status).toBe(500);
    });
});

describe('Trivia handler get question tests', () => {
    const validIdTrivia = 'f6c2';
    const invalidIdTrivia = '1';
    const exceptionIdTrivia = 'f6';
    const serviceRoute = '/api/trivia/question/';
    it('Should return 401 Unauthorized', async() => {
        const response = await request(app).get(serviceRoute + validIdTrivia);

        expect(response.status).toBe(401);
    });

    it('Should return 200 Successful', async() => {
        const response = await request(app).get(serviceRoute + validIdTrivia).set(
            { 'x-token': 'mytokennewuser' }
        );

        expect(response.body).toStrictEqual(
            {
                data: questionDataMock
            }
        );
        expect(response.status).toBe(200);
    });

    it('Should return 404 Not Found', async() => {
        const response = await request(app).get(serviceRoute + invalidIdTrivia).set(
            { 'x-token': 'mytokenuserwithouttrivia' }
        );

        expect(response.body).toStrictEqual(
            {
                data: {}
            }
        );
        expect(response.status).toBe(404);
    });

    it('Should return 500 Internal Server Error', async() => {
        const response = await request(app).get(serviceRoute + exceptionIdTrivia).set(
            { 'x-token': 'mytokennewuser' }
        );

        expect(response.body).toEqual(
            expect.objectContaining({

            })
        ),
        expect(response.status).toBe(500);
    });
});

describe('Trivia handler get summary tests', () => {
    const validIdTrivia = 'f6c2';
    const serviceRoute = '/api/trivia/summary/';
    const invalidIdTrivia = '1';
    it('Should return 401 Unauthorized', async() => {
        const response = await request(app).get(serviceRoute + validIdTrivia);

        expect(response.status).toBe(401);
    });

    it('Should return 200 Successful', async() => {
        const response = await request(app).get(serviceRoute + validIdTrivia).set(
            { 'x-token': 'mytokennewuser' }
        );
        expect(response.body).toStrictEqual(
            {
                score: 100,
                scores: userScoresMock
            }
        );
        expect(response.status).toBe(200);
    });

    it('Should return 400 Bad Request', async() => {
        const response = await request(app).get(serviceRoute + validIdTrivia).set(
            { 'x-token': 'tokenInvalidCloseTrivia' }
        );

        expect(response.body).toStrictEqual(
            {
                message: 'Error al cerrar la trivia'
            }
        );
        expect(response.status).toBe(400);
    });

    it('Should return 500 Internal Server Error', async() => {
        const response = await request(app).get(serviceRoute + validIdTrivia).set(
            { 'x-token': 'exceptionToken' }
        );
        expect(response.body).toEqual(
            expect.objectContaining({
                message: 'Error interno por favor intenta nuevamente'
            })
        ),
        expect(response.status).toBe(500);
    });

    it('Should return 400 Bad Request', async() => {
        const response = await request(app).get(serviceRoute + invalidIdTrivia).set(
            { 'x-token': 'mytokenuserwithouttrivia' }
        );
        expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
            })
        );
        expect(response.status).toBe(400);
    });
});
