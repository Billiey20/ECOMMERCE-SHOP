const express = require('express');
const { getAllDiscounts, createDiscount, validateDiscount } = require('../controllers/discountController');

const router = express.Router();

router.get('/', getAllDiscounts);
router.post('/', createDiscount);
router.post('/validate', validateDiscount);

module.exports = router;
