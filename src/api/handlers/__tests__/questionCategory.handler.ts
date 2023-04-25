import serverHandler from "../../test-helpers/handler/server.handler.mock";
const request = require('supertest');

const app = serverHandler.createServer();
describe('Get Question category handler tests', () => {
    it('Should return 401 Unauthorized', () => {
        return request(app).get('/api/question-category').expect(401);
    });
});
