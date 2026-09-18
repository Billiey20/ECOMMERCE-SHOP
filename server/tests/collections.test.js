const request = require('supertest');
const app = require('../src/index');

describe('Collection Endpoints', () => {
    describe('GET /api/collections', () => {
        it('should return 401 without token', async () => {
            const res = await request(app).get('/api/collections');
            expect(res.statusCode).toBe(401);
        });
    });
});
