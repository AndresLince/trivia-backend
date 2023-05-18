import { USER_MESSAGES } from "../../interfaces/messages/user-messages";
import serverHandler from "../../test-helpers/handler/server.handler.mock";
const request = require('supertest');

const app = serverHandler.createServer();
describe('Login tests', () => {
    it('Should return 400 bad request No body parameters', async () => {
        const response = await request(app).post('/api/auth/signup');

        expect(response.statusCode).toEqual(400);
    });
    it('Should return 200 successful login', async() => {
        const response = await request(app).post('/api/auth/signup').send(
            { 'userName': 'userName', 'ip': '116.117.12.15' }
        );

        expect(response.body).toStrictEqual({ message: USER_MESSAGES.USER_CREATED, token: '' });
        expect(response.status).toBe(200);
    });
    it('Should return 400 user already exist with that name and another Ip', async() => {
        const response = await request(app).post('/api/auth/signup').send(
            { 'userName': 'userNameDifferentIp', 'ip': '116.117.12.15' }
        );

        expect(response.status).toBe(400);
    });
    it('Should return 200 successful login with a new user name', async() => {
        const response = await request(app).post('/api/auth/signup').send(
            { 'userName': 'newUserName', 'ip': '116.117.12.15' }
        );

        expect(response.body).toStrictEqual({ message: USER_MESSAGES.USER_CREATED, token: '' });
        expect(response.status).toBe(200);
    });
    it('Should return 500 Internal server error', async() => {
        const response = await request(app).post('/api/auth/signup').send(
            { 'userName': 'exceptionUserName', 'ip': '116.117.12.15' }
        );

        expect(response.status).toBe(500);
    });
});
describe('renew json web token', () => {
    it('Should return 401 Unauthorized', async() => {
        const response = await request(app).get('/api/auth/renew');

        expect(response.status).toBe(401);
    });
    it('Should return 200 successful renew token', async() => {
        const response = await request(app).get('/api/auth/renew').set(
            { 'x-token': 'mytokennewuser' }
        );

        expect(response.body).toStrictEqual({ token: '' });
        expect(response.status).toBe(200);
    });
    it('Should return 401 Unauthorized', async() => {
        const response = await request(app).get('/api/auth/renew').set(
            { 'x-token': 'invalidToken' }
        )

        expect(response.status).toBe(401);
    });
    it('Should return 500 Internal server error', async() => {
        const response = await request(app).get('/api/auth/renew').set(
            { 'x-token': 'exceptionToken' }
        );

        expect(response.status).toBe(500);
    });
});
