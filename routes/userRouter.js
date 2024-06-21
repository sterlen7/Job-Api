const express = require('express');
const { registerVal } = require('../middleware/registerValidation');
const { userRegister, userLogin,createUserProfile, updateUserProfile, deleteUserAccount, getAllJobs, searchJobByTitle,  forgotPassword, applyJob } = require('../controller/userController');
const userRouter = express.Router();
const { userAuth } = require('../middleware/userAuthentication');
const { validateUserProfile } = require('../middleware/userProfileValid');
const { otp } = require('../middleware/sendCode');
const upload =require('../config/cloudinaryConfig')



//User registration
userRouter.post('/user/register',registerVal,userRegister)

//User Login
userRouter.post('/user/login',userLogin)



//User profile
userRouter.post('/user/profile', userAuth, upload.single('profilePicture'), validateUserProfile, createUserProfile)

userRouter.put('/user/profile', userAuth,upload.single('profilePicture'),updateUserProfile);

//delete user

userRouter.delete('/user/delete',userAuth,deleteUserAccount)

//jobs
userRouter.get('/jobs',getAllJobs)
userRouter.get('/jobs/search',searchJobByTitle)


//Password change
 userRouter.post('/forgot-password',userAuth,forgotPassword)

//otp code 
 userRouter.post('/otp-request',otp)

//job application 
// userRouter.post('/job-apply',userAuth ,applyJob)


module.exports = userRouter;


