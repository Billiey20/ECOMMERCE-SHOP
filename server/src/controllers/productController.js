const db = require('../config/db');

// @desc    Get all products (with variant count and total inventory)
// @route   GET /api/products
// @access  Private (Admin/Ops)
exports.getProducts = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id, p.title, p.status, p.product_type, p.vendor, p.created_at,
                COUNT(v.id) as variant_count,
                SUM(i.available) as total_inventory
            FROM Products p
            LEFT JOIN Variants v ON p.id = v.product_id
            LEFT JOIN Inventory i ON v.id = i.variant_id
            GROUP BY p.id
            ORDER BY p.created_at DESC
        `;
        const [products] = await db.query(query);
        res.status(200).json({ success: true, data: products });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a product with variants and inventory
// @route   POST /api/products
// @access  Private (Admin/Ops)
exports.createProduct = async (req, res) => {
    const { title, description, vendor, product_type, status, variants } = req.body;
    
    // Get a connection from the pool for the transaction
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();

        // 1. Insert Product
        const [productResult] = await connection.query(
            'INSERT INTO Products (title, description, vendor, product_type, status) VALUES (?, ?, ?, ?, ?)',
            [title, description, vendor, product_type, status || 'draft']
        );
        const productId = productResult.insertId;

        // 2. Insert Variants and Inventory
        if (variants && variants.length > 0) {
            for (const variant of variants) {
                // Insert Variant
                const [variantResult] = await connection.query(
                    'INSERT INTO Variants (product_id, sku, title, price, compare_at_price, weight_grams) VALUES (?, ?, ?, ?, ?, ?)',
                    [productId, variant.sku, variant.title, variant.price, variant.compare_at_price || null, variant.weight_grams || 0]
                );
                const variantId = variantResult.insertId;

                // Insert Inventory for the variant
                await connection.query(
                    'INSERT INTO Inventory (variant_id, available, reserved) VALUES (?, ?, 0)',
                    [variantId, variant.inventory || 0]
                );
            }
        }

        await connection.commit();
        res.status(201).json({ success: true, data: { id: productId } });
    } catch (err) {
        await connection.rollback();
        console.error('Transaction Rolled Back:', err);
        res.status(500).json({ success: false, error: 'Failed to create product' });
    } finally {
        connection.release();
    }
};

// @desc    Get single product with its variants
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM Products WHERE id = ?', [req.params.id]);
        if (products.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        
        const [variants] = await db.query(`
            SELECT v.*, i.available, i.reserved 
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
