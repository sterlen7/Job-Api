const Job = require('../models/jobModel')


exports.createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, deadline } = req.body;
        
      
        const newJob = new Job({
            title,
            description,
            company,
            location,
            salary,
            deadline
        });

        const savedJob = await newJob.save();
        
        res.status(201).json(savedJob);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// exports.getAllJobs = async (req, res) => {
//     try {
//         const jobs = await Job.find();
        
//         res.status(200).json(jobs);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };