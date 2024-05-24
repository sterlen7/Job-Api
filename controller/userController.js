const User = require('../models/userModel')
const bcrypt =require('bcrypt')
const Jwt= require('jsonwebtoken')
const UserProfile =require('../models/userProfileModel')



exports.userRegister= async (req,res)=>{
    const {email,password,username}=req.body

   try{
    const secretPassword = await bcrypt.hash(password, 10)

    const usernameExists = await User.findOne({username})
    const emailExists = await User.findOne({email})

    if (usernameExists) {
        return res.status(400).json({ msg: 'Username already exists' });
    }

    if(emailExists){
        return res.status(400).json({msg:"Email already exists"})
    }


    const newUser= new User({
        username:username,
        email:email,
        password:secretPassword,
    });

    const userCreated= await newUser.save()

    res.status(201).json(userCreated)

   }catch(err){
    console.error()
    res.status(500).json({msg:`Server error`})
   }

}


exports.userLogin= async(req,res)=>{
    const{username,email,password}=req.body

    try{
        if(!username && !email){
            return res.json({msg:'Email or username is required'})
        }

        if(!password){
            return res.json({msg:"Password is required."})
        }

        const user = await User.findOne({$or:[{username},{email}]})

        if(!user){
            return res.status(404).json({msg:"User does not exist , Sign Up!"})
        }

        const isPassword= await bcrypt.compare(password, user.password)
        
        if(!isPassword){
            res.status(403).json({msg:"Wrong password"})
        }

        if(user.banned){
            return res.json({msg:"You have been Banned. Please contact your admin"})
        }

        const token =Jwt.sign({userId:user.id},process.env.JWT_KEY,{expiresIn:'5000s'})

        res.json({msg:"Login Successful",token})

    }catch(err){
        console.error(err)
        res.status(501).json({msg:`server error`})
    }
}
