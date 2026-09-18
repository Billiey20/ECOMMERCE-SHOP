const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role_name = 'Customer' } = req.body;

        // Check if user exists
        const [existing] = await db.query('SELECT id FROM Users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }

        // Get role ID
        const [roles] = await db.query('SELECT id, name FROM Roles WHERE name = ?', [role_name]);
        if (roles.length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid role' });
        }
        const roleId = roles[0].id;
        const roleName = roles[0].name;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert user
        const [result] = await db.query(
            'INSERT INTO Users (role_id, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?)',
            [roleId, first_name, last_name, email, password_hash]
        );

        // Create token
        const token = generateToken(result.insertId, roleName);

        res.status(201).json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        // Check for user
        const [users] = await db.query(
            `SELECT u.*, r.name as role_name 
             FROM Users u 
             JOIN Roles r ON u.role_id = r.id 
             WHERE u.email = ?`, 
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Create token
        const token = generateToken(user.id, user.role_name);

        res.status(200).json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const [users] = await db.query(
            `SELECT u.id, u.first_name, u.last_name, u.email, r.name as role 
             FROM Users u 
             JOIN Roles r ON u.role_id = r.id 
             WHERE u.id = ?`, 
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({ success: true, data: users[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
