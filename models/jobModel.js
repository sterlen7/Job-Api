const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            enum: ['GHS'], 
            default:'GHS',
        },
    },
    postedAt: { type: Date, default: Date.now },
    deadline: Date,
});


jobSchema.methods.formatSalary = function() {
    return `₵${this.salary.amount}`; 
};


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
