const express = require('express');
const { registerVal } = require('../middleware/registerValidation');
const { userRegister, userLogin, userProfile, createUserProfile, updateUserProfile, deleteUserAccount, getAllJobs, searchJobByTitle} = require('../controller/userController');
const userRouter = express.Router();
const { userAuth } = require('../middleware/userAuthentication');
const { validateUserProfile } = require('../middleware/userProfileValid');

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



module.exports = userRouter;

