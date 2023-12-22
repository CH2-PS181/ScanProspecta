const express = require ('express');

const findJobController = require ('../controller/findJob.js');

const {authToken} = require ('../middleware/authorization.js')

const router = express.Router();

// GET all find job
router.get('/',authToken ,findJobController.getAllFindJob);

// create (POST) new job
router.post('/',authToken ,findJobController.createNewJob);

// GET all find job
router.get('/:job_id',authToken ,findJobController.getJobById);

module.exports = router;