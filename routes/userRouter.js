const express = require('express');
const { registerVal } = require('../middleware/registerValidation');
const { userRegister, userLogin, userProfile} = require('../controller/userController');
const userRouter = express.Router();
const { userAuth } = require('../middleware/userAuthentication');
const { validateUserProfile } = require('../middleware/userProfileValid');

//User registration
userRouter.post('/register',registerVal,userRegister)

//User Login
userRouter.post('/user/login',userLogin)

//User profile

// userRouter.post('/user/profile',userAuth,validateUserProfile,userProfile)

// userRouter.put('/user/profile',userAuth,validateUserProfile,userProfile)


module.exports = userRouter;

