const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, processRefund } = require('../controllers/orderController');

const router = express.Router();

// Public route for storefront checkout
router.post('/', createOrder);

// Admin / Ops routes (in production, secure with auth & RBAC middleware)
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', updateOrderStatus);
router.post('/:id/refund', processRefund);

module.exports = router;
