const dbPool = require('../config/database.js')

// GET all find job
const getAllFindJob = () => {
    const SQLQuery = 'SELECT * FROM find_job'

    return dbPool.query(SQLQuery)
}

//create(POST) new job 
const createNewJob = (body) => {
    const SQLQuery = `INSERT INTO find_job (title, location, salary, company_name) 
                      VALUE('${body.title}', '${body.location}', '${body.salary}', '${body.company_name}')`

    return dbPool.query(SQLQuery)
}

//GET job by id
const getJobById = (job_id) => { 
    const SQLQuery = 'SELECT * FROM find_job WHERE job_id =?'
    const values = [job_id]

    return dbPool.query(SQLQuery, values)
}



module.exports = {
    getAllFindJob,
    createNewJob,
    getJobById
}