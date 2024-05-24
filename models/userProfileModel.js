const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: { type: String, required: true },
    bio: { type: String},
    workExperience: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    education: [{
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    skills: [String],
    createdAt: {type: Date,default: Date.now},
    updatedAt: {type: Date,default: Date.now}
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
