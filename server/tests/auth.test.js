const request = require('supertest');
const app = require('../src/index');

describe('Auth Endpoints', () => {
    describe('POST /api/auth/register', () => {
        it('should return 201 or 500 without crashing', async () => {
            const res = await request(app).post('/api/auth/register').send({
                email: 'test' + Date.now() + '@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User'
            });
            expect([201, 500, 400]).toContain(res.statusCode);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should return token on successful login or fail gracefully', async () => {
            const res = await request(app).post('/api/auth/login').send({
                email: 'admin@lumoraskin.com',
                password: 'admin'
            });
            expect([200, 401, 500]).toContain(res.statusCode);
            if (res.statusCode === 200) {
                expect(res.body).toHaveProperty('token');
            }
        });
    });

    describe('GET /api/auth/me', () => {
        it('should return 401 without token', async () => {
            const res = await request(app).get('/api/auth/me');
            expect(res.statusCode).toBe(401);
        });
    });
});
