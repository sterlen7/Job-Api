const Admin =require('../models/adminModel')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')


exports.adminRegister=async(req,res)=>{
    const{username,email,password} = req.body;

    try{
        const usernameExists = await User.findOne({username})
        const emailExists = await User.findOne({email})
    
        if (usernameExists) {
            return res.status(400).json({ msg: 'Username already exists' });
        }
    
        if(emailExists){
            return res.status(400).json({msg:"Email already exists"})
        }

        const secretPassword= await bcrypt.hash(password,10)

        const newAdmin= new Admin({
            username:username,
            email:email,
            password:secretPassword
        })

        const adminCreated = await newAdmin.save()

        res.status(201).json(adminCreated)
    }catch(err){
        console.err()
        res.status(500).json({msg:'Server Error'})
    }
}


exports.adminLogin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!email && !username) {
            return res.status(400).json({ msg: 'Please Provide Email or Username' });
        }

        if (!password) {
            return res.status(400).json({ msg: 'Please enter password' });
        }
         const usernameExists = await User.findOne({username})
    const emailExists = await User.findOne({email})

    if (usernameExists) {
        return res.status(400).json({ msg: 'Username already exists' });
    }

    if(emailExists){
        return res.status(400).json({msg:"Email already exists"})
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





