const Joi = require('joi');

const userProfileSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    bio: Joi.string().optional(),
    workExperience: Joi.array().items(
        Joi.object({
            company: Joi.string().required(),
            position: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().optional(),
            description: Joi.string().optional()
        })
    ).optional(),
    education: Joi.array().items(
        Joi.object({
            school: Joi.string().required(),
            degree: Joi.string().required(),
            fieldOfStudy: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().optional(),
            description: Joi.string().optional()
        })
    ).optional(),
    skills: Joi.array().items(Joi.string()).optional(),
    profilePicture: Joi.string().optional()
});

exports.validateUserProfile = (req, res, next) => {
    const { error } = userProfileSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: error.details[0].message });
    }
    next();
};

