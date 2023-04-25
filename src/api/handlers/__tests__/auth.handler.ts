import serverHandler from "../../test-helpers/handler/server.handler.mock";
const request = require('supertest');

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
    it('Should return 500 Internal server error', () => {
        return request(app).post('/api/auth/signup')
            .send(
                { 'userName': 'exceptionUserName', 'ip': '116.117.12.15' }
            ).then((response: Response) => {
                expect(response.status).toBe(500);
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
