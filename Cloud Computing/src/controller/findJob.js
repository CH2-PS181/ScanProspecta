const findJobModel = require('../models/findJob.js');

//GET all the job
const getAllFindJob = async (req, res) => {
    try {
        const [data] = await findJobModel.getAllFindJob(); 
    
        res.json({
            message: 'Get all find job success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        });
    }
};

//POST the new job
const createNewJob = async (req, res) => {
    const {body} = req;
    try {
        await findJobModel.createNewJob(body)
        res.json({
            message: 'Create new job success',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        });
    }
}

//GET specific job by job_id
const getJobById = async (req, res) =>{ 
    const job_id = req.params.job_id;
    try {
        const [data] = await findJobModel.getJobById(job_id)     
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Job not found',
            });
        } else {
            res.json({
                message: 'Get job by ID success',
                data: data,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        })
    }
}

module.exports = {
    getAllFindJob,
    createNewJob,
    getJobById
};
