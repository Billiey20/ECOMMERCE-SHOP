/**
 * Analytics Endpoint Tests
 * Tests that the analytics API returns the correct data shape.
 * The controller falls back to rich mock data when DB is unavailable.
 */
const request = require('supertest');
const app = require('../src/index');

describe('GET /api/analytics', () => {

    it('should return a 200 with success=true', async () => {
        const res = await request(app).get('/api/analytics');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it('should return revenueByDay as an array', async () => {
        const res = await request(app).get('/api/analytics');
        expect(Array.isArray(res.body.data.revenueByDay)).toBe(true);
    });

    it('revenueByDay entries should have date, revenue, and orders fields', async () => {
        const res = await request(app).get('/api/analytics');
        const day = res.body.data.revenueByDay[0];
        expect(day).toHaveProperty('date');
        expect(day).toHaveProperty('revenue');
        expect(day).toHaveProperty('orders');
    });

    it('should return topProducts as an array with at least 1 entry', async () => {
        const res = await request(app).get('/api/analytics');
        const { topProducts } = res.body.data;
        expect(Array.isArray(topProducts)).toBe(true);
        expect(topProducts.length).toBeGreaterThan(0);
    });

    it('should return KPIs with total_revenue, total_orders, avg_order_value', async () => {
        const res = await request(app).get('/api/analytics');
        const { kpis } = res.body.data;
        expect(kpis).toHaveProperty('total_revenue');
        expect(kpis).toHaveProperty('total_orders');
        expect(kpis).toHaveProperty('avg_order_value');
    });

    it('KPI total_revenue should be a positive number', async () => {
        const res = await request(app).get('/api/analytics');
        const { total_revenue } = res.body.data.kpis;
        expect(Number(total_revenue)).toBeGreaterThan(0);
    });
});
