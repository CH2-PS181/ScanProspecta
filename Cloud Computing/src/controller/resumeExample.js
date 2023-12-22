const resumeExampleModel = require ('../models/resumeExample.js');

//GET all the resume example
const getAllResumeExample = async (req, res) => {
    try {
        const [data] = await resumeExampleModel.getAllResumeExample(); 
    
        res.json({
            message: 'Get all resume example success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        });
    }
}

//create (POST) new resume example
const createNewResumeExample = async (req, res) => {
    const {body} = req;
    try {
        await resumeExampleModel.createNewResumeExample(body)
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

//GET resume example by id 
const getResumeExampleById = async (req, res) =>{ 
    const resume_id = req.params.resume_id;
    try {
        const [data] = await resumeExampleModel.getResumeExampleById(resume_id)     
        if (data.length === 0) {
            return res.status(404).json({
                message: 'Resume Example not found',
            });
        } else {
            res.json({
                message: 'Get resume by ID success',
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
    getAllResumeExample,
    createNewResumeExample,
    getResumeExampleById
}