const db = require('../config/db');

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
exports.getProductReviews = async (req, res) => {
    try {
        const [reviews] = await db.query(`
            SELECT r.*, u.first_name, u.last_name 
            FROM Reviews r
            JOIN Users u ON r.user_id = u.id
            WHERE r.product_id = ?
            ORDER BY r.created_at DESC
        `, [req.params.productId]);
        
        res.status(200).json({ success: true, data: reviews });
    } catch (err) {
        console.error('Error fetching reviews:', err.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a review for a product
// @route   POST /api/reviews/:productId
// @access  Private (Customer)
exports.createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const userId = req.user.id;
        const productId = req.params.productId;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, error: 'Please provide a valid rating between 1 and 5' });
        }

        const [result] = await db.query(`
            INSERT INTO Reviews (product_id, user_id, rating, comment)
            VALUES (?, ?, ?, ?)
        `, [productId, userId, rating, comment]);

        res.status(201).json({ success: true, reviewId: result.insertId });
    } catch (err) {
        console.error('Error creating review:', err.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
