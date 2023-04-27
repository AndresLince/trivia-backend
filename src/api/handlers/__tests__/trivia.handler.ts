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
