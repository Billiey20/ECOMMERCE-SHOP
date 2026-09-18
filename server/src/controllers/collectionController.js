const db = require('../config/db');

// @desc    Get all collections (with product count)
// @route   GET /api/collections
// @access  Private (Admin/Ops)
exports.getCollections = async (req, res) => {
    try {
        const [collections] = await db.query(`
            SELECT c.*, COUNT(cp.product_id) as product_count
            FROM Collections c
            LEFT JOIN Collection_Products cp ON c.id = cp.collection_id
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `);
        res.status(200).json({ success: true, data: collections });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a collection
// @route   POST /api/collections
// @access  Private (Admin/Ops)
exports.createCollection = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) return res.status(400).json({ success: false, error: 'Title is required' });

        const [result] = await db.query(
            'INSERT INTO Collections (title, description) VALUES (?, ?)',
            [title, description || null]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, title } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get a single collection with all its products
// @route   GET /api/collections/:id
// @access  Private
exports.getCollection = async (req, res) => {
    try {
        const [cols] = await db.query('SELECT * FROM Collections WHERE id = ?', [req.params.id]);
        if (cols.length === 0) return res.status(404).json({ success: false, error: 'Collection not found' });

        const [products] = await db.query(`
            SELECT p.id, p.title, p.status, p.vendor
            FROM Products p
            JOIN Collection_Products cp ON p.id = cp.product_id
            WHERE cp.collection_id = ?
        `, [req.params.id]);

        const collection = cols[0];
        collection.products = products;

        res.status(200).json({ success: true, data: collection });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Add a product to a collection
// @route   POST /api/collections/:id/products
// @access  Private (Admin/Ops)
exports.addProductToCollection = async (req, res) => {
    try {
        const { product_id } = req.body;
        const collection_id = req.params.id;

        await db.query(
            'INSERT IGNORE INTO Collection_Products (collection_id, product_id) VALUES (?, ?)',
            [collection_id, product_id]
        );

        res.status(200).json({ success: true, message: 'Product added to collection' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Remove a product from a collection
// @route   DELETE /api/collections/:id/products/:productId
// @access  Private (Admin/Ops)
exports.removeProductFromCollection = async (req, res) => {
    try {
        await db.query(
            'DELETE FROM Collection_Products WHERE collection_id = ? AND product_id = ?',
            [req.params.id, req.params.productId]
        );
        res.status(200).json({ success: true, message: 'Product removed from collection' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
