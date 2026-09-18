const request = require('supertest');
const app = require('../src/index');

describe('Product Endpoints', () => {
    describe('GET /api/products', () => {
        it('should return 401 without token', async () => {
            const res = await request(app).get('/api/products');
            expect(res.statusCode).toBe(401);
        });
    });

    describe('POST /api/products', () => {
        it('should return 401 without token', async () => {
            const res = await request(app).post('/api/products').send({ title: 'New Product' });
            expect(res.statusCode).toBe(401);
        });
    });
});
