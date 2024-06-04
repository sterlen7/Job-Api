const express = require('express');
const { registerVal } = require('../middleware/registerValidation');
const { userRegister, userLogin,createUserProfile, updateUserProfile, deleteUserAccount, getAllJobs, searchJobByTitle,  forgotPassword } = require('../controller/userController');
const userRouter = express.Router();
const { userAuth } = require('../middleware/userAuthentication');
const { validateUserProfile } = require('../middleware/userProfileValid');
const { otp } = require('../middleware/sendCode');
const upload =require('../config/multerConfig');


//User registration
userRouter.post('/user/register',registerVal,userRegister)

//User Login
userRouter.post('/user/login',userLogin)

//User profile
userRouter.post('/user/profile',userAuth,validateUserProfile,createUserProfile)

userRouter.put('/user/profile', userAuth, updateUserProfile);

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


module.exports = userRouter;



// ,upload.single('cv')
