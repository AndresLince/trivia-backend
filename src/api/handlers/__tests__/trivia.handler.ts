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
});
