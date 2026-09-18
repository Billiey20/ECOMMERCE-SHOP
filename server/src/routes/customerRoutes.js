const express = require('express');
const { getAllCustomers, getCustomerOrders } = require('../controllers/customerController');
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles('Admin', 'Operations Manager', 'Customer Service'));

router.get('/', getAllCustomers);
router.get('/:id/orders', getCustomerOrders);

module.exports = router;
