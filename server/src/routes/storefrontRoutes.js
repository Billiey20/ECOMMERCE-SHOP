const express = require('express');
const { 
    getStorefrontProduct, 
    getStorefrontCollection,
    getStorefrontProducts,
    getStorefrontCollections 
} = require('../controllers/storefrontController');

const router = express.Router();

router.get('/products', getStorefrontProducts);
router.get('/products/:id', getStorefrontProduct);
router.get('/collections', getStorefrontCollections);
router.get('/collections/:id', getStorefrontCollection);

module.exports = router;
