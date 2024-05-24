const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: {type: String,required: true },
    description: {type: String,required: true },
    company: { type: String, required: true},
    location: String,
    salary: Number,
    postedAt: {type: Date,default: Date.now},
    deadline: Date
});


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
