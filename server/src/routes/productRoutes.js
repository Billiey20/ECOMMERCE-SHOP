const express = require('express');
const { getProducts, createProduct, getProduct } = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// All product admin routes are protected for Admin and Operations
router.use(verifyToken);
router.use(authorizeRoles('Admin', 'Operations Manager'));

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct);

module.exports = router;
