const express = require('express');
const { getProductReviews, createReview } = require('../controllers/reviewController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.route('/:productId')
    .get(getProductReviews)
    .post(verifyToken, createReview);

module.exports = router;
