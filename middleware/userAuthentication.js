const Jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.userAuth = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: 'Access denied! No token provided' });
    }

    try {
        // Verify token
        const verifyToken = Jwt.verify(token.replace('Bearer ', ''), process.env.JWT_KEY);


        const user = await User.findById(verifyToken.userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Error verifying token', err.message);
        return res.status(401).json({ msg: 'Invalid token' });
    }
};
