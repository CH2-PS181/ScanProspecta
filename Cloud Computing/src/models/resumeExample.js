const dbPool = require ('../config/database.js');

//GET all the resume example
const getAllResumeExample = () => {
    const SQLQuery = 'SELECT * FROM resume'

    return dbPool.query(SQLQuery)
}

// create (POST) new resume example
const createNewResumeExample = (body) => {
    const { name, email, address, description, edu_background, work_exp, skills } = body;

    const SQLQuery = `INSERT INTO resume (name, email, address, description, edu_background, work_exp, skills)
                      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [name, email, address, description, edu_background, work_exp, skills];

    return dbPool.query(SQLQuery, values);
};

// GET resume example by id
const getResumeExampleById = (resume_id) => {
    const SQLQuery = 'SELECT * FROM auth_db.resume WHERE resume_id = ?'
    const values = [resume_id]

    return dbPool.query(SQLQuery, values)
}

module.exports = {
    getAllResumeExample,
    createNewResumeExample,
    getResumeExampleById
}