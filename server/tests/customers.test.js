const request = require('supertest');
const app = require('../src/index');

describe('Customer Endpoints', () => {
    describe('GET /api/customers', () => {
        it('should return 401 without token', async () => {
            const res = await request(app).get('/api/customers');
            expect(res.statusCode).toBe(401);
        });
    });
});
