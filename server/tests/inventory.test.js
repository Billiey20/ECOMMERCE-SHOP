const request = require('supertest');
const app = require('../src/index');

describe('Inventory Endpoints', () => {
    describe('GET /api/inventory', () => {
        it('should return 401 without token', async () => {
            const res = await request(app).get('/api/inventory');
            expect(res.statusCode).toBe(401);
        });
    });
});
