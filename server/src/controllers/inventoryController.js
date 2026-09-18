const db = require('../config/db');

const LOW_STOCK_THRESHOLD = 5; // Flag variants with <= 5 units

// @desc    Get all inventory across all variants (with product/variant info)
// @route   GET /api/inventory
// @access  Private (Admin/Ops)
exports.getInventory = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                i.id as inventory_id,
                i.available,
                i.reserved,
                i.updated_at,
                v.id as variant_id,
                v.title as variant_title,
                v.sku,
                p.id as product_id,
                p.title as product_title,
                p.status as product_status,
                CASE WHEN i.available <= ${LOW_STOCK_THRESHOLD} AND i.available > 0 THEN 1 ELSE 0 END as low_stock,
                CASE WHEN i.available = 0 THEN 1 ELSE 0 END as out_of_stock
            FROM Inventory i
            JOIN Variants v ON i.variant_id = v.id
            JOIN Products p ON v.product_id = p.id
            ORDER BY p.title, v.title
        `);
        res.status(200).json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Adjust inventory for a specific variant (atomic operation)
// @route   PUT /api/inventory/:variantId/adjust
// @access  Private (Admin/Ops)
exports.adjustInventory = async (req, res) => {
    const { adjustment, reason } = req.body;
    const variantId = req.params.variantId;

    if (adjustment === undefined || adjustment === null) {
        return res.status(400).json({ success: false, error: 'adjustment value is required' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Fetch current stock with a row lock to prevent race conditions
        const [rows] = await connection.query(
            'SELECT available FROM Inventory WHERE variant_id = ? FOR UPDATE',
            [variantId]
        );

        if (rows.length === 0) {
            await connection.rollback();
            return res.status(404).json({ success: false, error: 'Inventory record not found for this variant' });
        }

        const currentStock = rows[0].available;
        const newStock = currentStock + parseInt(adjustment);

        // Prevent stock going negative (oversell protection)
        if (newStock < 0) {
            await connection.rollback();
            return res.status(400).json({
                success: false,
                error: `Cannot reduce stock below 0. Current: ${currentStock}, Attempted change: ${adjustment}`
            });
        }

        // Apply the adjustment
        await connection.query(
            'UPDATE Inventory SET available = ? WHERE variant_id = ?',
            [newStock, variantId]
        );

        // Write to audit history
        await connection.query(
            'INSERT INTO Inventory_History (variant_id, adjustment, reason, adjusted_by_user_id) VALUES (?, ?, ?, ?)',
            [variantId, adjustment, reason || 'Manual Adjustment', req.user.id]
        );

        await connection.commit();
        res.status(200).json({
            success: true,
            data: { variantId, previous: currentStock, adjustment, new_stock: newStock }
        });
    } catch (err) {
        await connection.rollback();
        console.error('Inventory adjustment rolled back:', err);
        res.status(500).json({ success: false, error: 'Inventory adjustment failed' });
    } finally {
        connection.release();
    }
};

// @desc    Get inventory history for a specific variant
// @route   GET /api/inventory/:variantId/history
// @access  Private (Admin/Ops)
exports.getInventoryHistory = async (req, res) => {
    try {
        const [history] = await db.query(`
            SELECT
                ih.*,
                CONCAT(u.first_name, ' ', u.last_name) as adjusted_by
            FROM Inventory_History ih
            LEFT JOIN Users u ON ih.adjusted_by_user_id = u.id
            WHERE ih.variant_id = ?
            ORDER BY ih.created_at DESC
            LIMIT 50
        `, [req.params.variantId]);

        res.status(200).json({ success: true, data: history });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get low stock + out of stock summary
// @route   GET /api/inventory/alerts
// @access  Private (Admin/Ops)
exports.getInventoryAlerts = async (req, res) => {
    try {
        const [alerts] = await db.query(`
            SELECT
                p.title as product_title,
                v.title as variant_title,
                v.sku,
                i.available,
                CASE WHEN i.available = 0 THEN 'out_of_stock' ELSE 'low_stock' END as alert_type
            FROM Inventory i
            JOIN Variants v ON i.variant_id = v.id
            JOIN Products p ON v.product_id = p.id
            WHERE i.available <= ${LOW_STOCK_THRESHOLD}
            ORDER BY i.available ASC
        `);
        res.status(200).json({ success: true, count: alerts.length, data: alerts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
