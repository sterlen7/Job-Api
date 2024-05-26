const Job = require('../models/jobModel')


exports.createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, deadline } = req.body;
        const { amount } = salary;
      
        const newJob = new Job({
            title,
            description,
            company,
            location,
            salary: {
                amount: amount,
                currency: 'GHS',
            },
            deadline,
        });

        const savedJob = await newJob.save();
        
        res.status(201).json(savedJob);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// exports.editJob = async (req, res) => {
//     const adminId = req.admin.adminId;
//     const jobId = req.params.id; // Assuming the job ID is passed as a URL parameter
    
//     const { title, description, company, location, salary, deadline } = req.body;

//     try {
//         // Check if the job exists
//         const job = await Job.findById(jobId);

//         if (!job) {
//             return res.status(404).json({ msg: 'Job not found' });
//         }

//         // Check if the admin is authorized to update the job
//         if (job.admin.toString() !== adminId) {
//             return res.status(401).json({ msg: 'Unauthorized' });
//         }

//         // Update the job fields
//         if (title) job.title = title;
//         if (description) job.description = description;
//         if (company) job.company = company;
//         if (location) job.location = location;
//         if (salary) job.salary = salary;
//         if (deadline) job.deadline = deadline;

//         // Save the updated job
//         await job.save();

//         res.status(200).json({ msg: 'Job updated successfully', job });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'Server error' });
//     }
// };

