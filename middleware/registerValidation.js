const Joi = require('joi')

const registerSchema = Joi.object({
    username: Joi.string().required().label('Username'),
    email:Joi.string().email().required().label('Email'),
    password:Joi.string().min(8).required().label('Password')
})


exports.registerVal=(req,res,next)=>{
    const{error}=registerSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            msg:error.details[0].message
        })
        
    }
    next();
}



