const express = require('express');
const {
    getInventory,
    adjustInventory,
    getInventoryHistory,
    getInventoryAlerts
} = require('../controllers/inventoryController');
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRoles('Admin', 'Operations Manager'));

router.get('/', getInventory);
router.get('/alerts', getInventoryAlerts);
router.put('/:variantId/adjust', adjustInventory);
router.get('/:variantId/history', getInventoryHistory);

module.exports = router;
