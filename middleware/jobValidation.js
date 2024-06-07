const Joi = require('joi');

const jobSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    company: Joi.string().min(2).max(100).required(),
    location: Joi.string().min(2).max(100).required(),
    salary: Joi.object({
        amount: Joi.number().positive().required(),
        currency: Joi.string().valid('GHS','USD').required() 
    }).required(),
    deadline: Joi.date().optional()
});


exports.jobValidation = async (req, res, next) => {
    const { error } = jobSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
