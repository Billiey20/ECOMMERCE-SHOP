const express = require('express');
const { getStorefrontProduct, getStorefrontCollection } = require('../controllers/storefrontController');

const router = express.Router();

router.get('/products/:id', getStorefrontProduct);
router.get('/collections/:id', getStorefrontCollection);

module.exports = router;
