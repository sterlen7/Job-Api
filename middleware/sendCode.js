const nodemailer = require('nodemailer');
const User = require('../models/userModel');
require('dotenv').config();



function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

exports.otp= async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otpCode = generateCode();

      
        user.otpCode = otpCode;
        user.otpCodeExpires = Date.now() + 3600000;
        await user.save();

       
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure:true,
            port:465,
            auth: {
                user: process.env.USER,
                pass: process.env.USER_KEY
            }

        });

        let mailOptions = {
            from: `"No Reply" <${process.env.USER}>`,
            to: user.email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otpCode}. It will expire in 1 hour.`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'OTP code sent successfully' });
    } catch (error) {
        console.error('Error sending OTP code:', error);
        return res.status(500).json({ message: 'Failed to send OTP code' });
    }
  
};



