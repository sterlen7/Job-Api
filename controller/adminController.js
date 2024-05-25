const Admin =require('../models/adminModel')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')

exports.adminRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const usernameExists = await Admin.findOne({ username });
        const emailExists = await Admin.findOne({ email });

        if (usernameExists) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        if (emailExists) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword
        });

        const adminCreated = await newAdmin.save();

        res.status(201).json({ adminCreated });
    } catch (error) {
        console.error('Error registering admin:', error.message);
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
};


exports.adminLogin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!email && !username) {
            return res.status(400).json({ msg: 'Please Provide Email or Username' });
        }

        if (!password) {
            return res.status(400).json({ msg: 'Please enter password' });
        }

        const admin = await Admin.findOne({ $or: [{ username }, { email }] });

        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }

        const isPassword = await bcrypt.compare(password, admin.password);

        if (!isPassword) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        const adminToken = Jwt.sign({ adminId: admin.id }, process.env.JWT_KEY, { expiresIn: '7000s' });

        return res.status(200).json({ msg: 'Login Success', token: adminToken });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};





