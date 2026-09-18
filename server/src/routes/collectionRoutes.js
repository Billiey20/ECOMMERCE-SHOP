const express = require('express');
const {
    getCollections,
    createCollection,
    getCollection,
    addProductToCollection,
    removeProductFromCollection
} = require('../controllers/collectionController');
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Protect all routes
router.use(verifyToken);
router.use(authorizeRoles('Admin', 'Operations Manager'));

router.route('/')
    .get(getCollections)
    .post(createCollection);

router.route('/:id')
    .get(getCollection);

router.route('/:id/products')
    .post(addProductToCollection);

router.route('/:id/products/:productId')
    .delete(removeProductFromCollection);

module.exports = router;
