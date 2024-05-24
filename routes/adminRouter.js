const express = require('express');
const { registerVal } = require('../middleware/registerValidation');
const { adminRegister, adminLogin } = require('../controller/adminController');
const { adminAuth } = require('../middleware/adminAuthentication');
const { createJob } = require('../controller/jobController');
const { jobValidation } = require('../middleware/jobValidation');
const adminRouter = express.Router();


adminRouter.post('/admin/register',registerVal,adminRegister)
adminRouter.post('/admin/login',adminLogin)
adminRouter.post('/admin/job/add',adminAuth,jobValidation,createJob)


module.exports = {adminRouter};