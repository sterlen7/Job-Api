const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    applicantName: { type: String, required: true },
    email: { type: String, required: true },
    jobTitle: { type: String, required: true },
    cvUrl: { type: String, required: true }
}, {
    timestamps: true
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
