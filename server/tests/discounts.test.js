/**
 * Discount Engine Tests
 * Tests the core promo code validation logic without a database connection.
 * Uses Supertest to call the real Express route, which falls back to mock data.
 */
const request = require('supertest');
const app = require('../src/index');

describe('POST /api/discounts/validate', () => {

    it('should accept a valid promo code (WELCOME10)', async () => {
        const res = await request(app)
            .post('/api/discounts/validate')
            .send({ code: 'WELCOME10' });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('code');
        expect(res.body.data.code).toBe('WELCOME10');
        expect(res.body.data).toHaveProperty('type');
        expect(res.body.data).toHaveProperty('value');
    });

    it('should be case-insensitive (welcome10 -> WELCOME10)', async () => {
        const res = await request(app)
            .post('/api/discounts/validate')
            .send({ code: 'welcome10' });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should reject an invalid promo code', async () => {
        const res = await request(app)
            .post('/api/discounts/validate')
            .send({ code: 'FAKECODE99' });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if no code is provided', async () => {
        const res = await request(app)
            .post('/api/discounts/validate')
            .send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});

describe('GET /api/discounts', () => {
    it('should return a list of discounts', async () => {
        const res = await request(app).get('/api/discounts');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
