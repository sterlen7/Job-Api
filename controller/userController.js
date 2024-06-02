const User = require('../models/userModel')
const bcrypt =require('bcrypt')
const Jwt= require('jsonwebtoken')
const UserProfile =require('../models/userProfileModel')
const Job = require('../models/jobModel')



exports.userRegister= async (req,res)=>{
    const {email,password,username}=req.body

   try{
   
    const secretPassword = await bcrypt.hash(password,10)

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
           return res.status(403).json({msg:"Wrong password"})
        }

        if(user.banned){
            return res.json({msg:"You have been Banned. Please contact your admin"})
        }

        const token =Jwt.sign({userId:user.id},process.env.JWT_KEY,{expiresIn:'5000s'})

         res.json({msg:"Login Successful",token})

    }catch(err){
        console.error(err)
        return res.status(501).json({msg:`server error`})
    }
}

exports.deleteUserAccount = async(req,res)=>{
    const userId = req.user.id

    try{
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({ msg: 'User deleted successfully' });

    }catch(error){
        console.error(error)
        res.status(501).json(message.error)
    }
}



exports.createUserProfile = async (req, res) => {
    const userId = req.user.id;
    const {name, email, bio, workExperience, education, skills} = req.body;

    try {
        let profile = await UserProfile.findOne({ userId });

        if (profile) {
            return res.status(400).json({ msg: 'Profile already exists' });
        }

        profile = new UserProfile({
            userId,
            name,
            email,
            bio,
            workExperience,
            education,
            skills,
        });

        await profile.save();

        return res.status(201).json({ msg: "User profile created successfully", profile });
    } catch (err) {
        console.error('Error creating user profile:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};



exports.updateUserProfile = async (req, res) => {
    const userId = req.user.userId;
    const { name, email, bio, workExperience, education, skills } = req.body;

    try {
        let profile = await UserProfile.findOne({ userId });


        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        // Update profile fields if provided
        if (name) profile.name = name;
        if (email) profile.email = email;
        if (bio) profile.bio = bio;
        if (workExperience) profile.workExperience = workExperience;
        if (education) profile.education = education;
        if (skills) profile.skills = skills;
        if (req.file) profile.profileImage = req.file.path

        await profile.save();

        return res.status(200).json({ msg: "User profile updated successfully", profile });

    } catch (err) {
        console.error('Error updating user profile:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

exports.getAllJobs = async(req,res)=>{
    try {
       
        const jobs = await Job.find();

        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

}


exports.searchJobByTitle =async(req,res)=>{
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Provide job title' });
        }

        
        const jobs = await Job.find({ title: { $regex: new RegExp(title, 'i') } });

        
        if (jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found with the specified title' });
        }

        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

}


exports.forgotPassword = async(req,res) => {
    const { email, otpCode, newPassword } = req.body;
    try {
        

        if (!email || !otpCode || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP code, and new password are required' });
        }

        const user = await User.findOne({ email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otpCode !== otpCode || user.otpCodeExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP code' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword; 
        user.otpCode = undefined; 
        user.otpCodeExpires = undefined; 
        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

