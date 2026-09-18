/**
 * Health Check Tests
 * Verifies the API is running and responds correctly.
 */
const request = require('supertest');
const app = require('../src/index');

describe('GET /api/health', () => {
    it('should return status ok', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    it('should return a message field', async () => {
        const res = await request(app).get('/api/health');
        expect(res.body).toHaveProperty('message');
    });
});

describe('404 handling', () => {
    it('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/api/does-not-exist');
        expect(res.statusCode).toBe(404);
    });
});
