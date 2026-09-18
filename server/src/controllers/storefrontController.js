const db = require('../config/db');

// @desc    Get single product with its active variants for storefront
// @route   GET /api/storefront/products/:id
// @access  Public
exports.getStorefrontProduct = async (req, res) => {
    try {
        const [products] = await db.query(
            'SELECT id, title, description, vendor, product_type FROM Products WHERE id = ? AND status = "active"', 
            [req.params.id]
        );
        
        if (products.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found or not active' });
        }
        
        const [variants] = await db.query(`
            SELECT v.id, v.title, v.price, v.compare_at_price, v.sku, i.available 
            FROM Variants v
            LEFT JOIN Inventory i ON v.id = i.variant_id
            WHERE v.product_id = ?
        `, [req.params.id]);

        const product = products[0];
        product.variants = variants;

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get all active products in a collection for the storefront
// @route   GET /api/storefront/collections/:id
// @access  Public
exports.getStorefrontCollection = async (req, res) => {
    try {
        const [cols] = await db.query('SELECT id, title, description FROM Collections WHERE id = ?', [req.params.id]);
        if (cols.length === 0) return res.status(404).json({ success: false, error: 'Collection not found' });

        const [products] = await db.query(`
            SELECT p.id, p.title, p.vendor,
                   MIN(v.price) as starting_price,
                   SUM(i.available) as total_inventory
            FROM Products p
            JOIN Collection_Products cp ON p.id = cp.product_id
            LEFT JOIN Variants v ON p.id = v.product_id
            LEFT JOIN Inventory i ON v.id = i.variant_id
            WHERE cp.collection_id = ? AND p.status = 'active'
            GROUP BY p.id
        `, [req.params.id]);

        res.status(200).json({ success: true, data: { ...cols[0], products } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

