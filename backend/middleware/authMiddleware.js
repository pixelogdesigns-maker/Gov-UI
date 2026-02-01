const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    // BYPASS AUTHENTICATION: Auto-assign user as Admin
    req.user = {
        _id: 'dummy_user_id',
        name: 'System Admin',
        email: 'admin@gov.in',
        role: 'Admin'
    };
    next();
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'User role not authorized' });
        }
        next();
    };
};

module.exports = { protect, authorize };
