import serverHandler from "../../test-helpers/handler/server.handler.mock";
const request = require('supertest');

const app = serverHandler.createServer();
describe('Trivia handler create tests', () => {
    it('Should return 401 Unauthorized', () => {
        return request(app).post('/api/trivia').expect(401);
    });
});