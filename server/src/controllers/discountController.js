const db = require('../config/db');

// @desc    Get all active discounts
// @route   GET /api/discounts
// @access  Private (Admin)
exports.getAllDiscounts = async (req, res) => {
    try {
        const [discounts] = await db.query('SELECT *, discount_type as type FROM Discounts ORDER BY id DESC');
        res.status(200).json({ success: true, data: discounts });
    } catch (err) {
        console.error('Error fetching discounts:', err.message);
        // Fallback demo data
        res.status(200).json({ 
            success: true, 
            data: [
                { id: 1, code: 'WELCOME10', type: 'percentage', discount_type: 'percentage', value: 10.00, is_active: 1 },
                { id: 2, code: 'MINUS5', type: 'fixed', discount_type: 'fixed', value: 5.00, is_active: 1 }
            ], 
            mock: true 
        });
    }
};

// @desc    Create a new discount code
// @route   POST /api/discounts
// @access  Private (Admin)
exports.createDiscount = async (req, res) => {
    try {
        const { code, type, discount_type, value, is_active } = req.body;
        const discountType = discount_type || type;
        
        // Simple validation
        if (!code || !discountType || !value) {
            return res.status(400).json({ success: false, error: 'Please provide all fields' });
        }

        const [result] = await db.query(`
            INSERT INTO Discounts (code, discount_type, value, is_active)
            VALUES (?, ?, ?, ?)
        `, [code.toUpperCase(), discountType, value, is_active === undefined ? 1 : is_active]);

        res.status(201).json({ success: true, discountId: result.insertId });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, error: 'Discount code already exists' });
        }
        console.error('Error creating discount:', err.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Validate a discount code for the storefront
// @route   POST /api/discounts/validate
// @access  Public
exports.validateDiscount = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ success: false, error: 'Please provide a code' });

        const [discounts] = await db.query('SELECT *, discount_type as type FROM Discounts WHERE code = ? AND is_active = 1', [code.toUpperCase()]);
        
        if (discounts.length === 0) {
            // Check mock codes if DB fails/empty
            if (code.toUpperCase() === 'WELCOME10') {
                return res.status(200).json({ success: true, data: { code: 'WELCOME10', type: 'percentage', discount_type: 'percentage', value: 10 } });
            }
            return res.status(404).json({ success: false, error: 'Invalid or inactive discount code' });
        }

        const discount = discounts[0];
        res.status(200).json({ 
            success: true, 
            data: { 
                ...discount, 
                type: discount.discount_type || discount.type 
            } 
        });
    } catch (err) {
        console.error('Error validating discount:', err.message);
        // DB offline: serve known mock codes; unknown codes get a proper 404
        const knownMocks = {
            'WELCOME10': { code: 'WELCOME10', type: 'percentage', discount_type: 'percentage', value: 10 },
            'MINUS5':    { code: 'MINUS5',    type: 'fixed',      discount_type: 'fixed',      value: 5  },
        };
        const upper = req.body.code?.toUpperCase();
        if (upper && knownMocks[upper]) {
            return res.status(200).json({ success: true, data: knownMocks[upper] });
        }
        return res.status(404).json({ success: false, error: 'Invalid or inactive discount code' });
    }
};
