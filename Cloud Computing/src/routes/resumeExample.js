const express = require ('express');

const resumeExampleController = require ('../controller/resumeExample.js');

const {authToken} = require ('../middleware/authorization.js')

const router = express.Router();

//GET all the resume example
router.get ('/', authToken, resumeExampleController.getAllResumeExample);

//create (POST) new resume example
router.post ('/', authToken, resumeExampleController.createNewResumeExample)

//GET resume example by id
router.get('/:resume_id', authToken, resumeExampleController.getResumeExampleById)

module.exports = router;