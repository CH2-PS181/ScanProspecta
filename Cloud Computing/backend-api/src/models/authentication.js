const dbPool = require ('../config/database')

//REGISTRATION NEW USER
const createNewUser = (body) => {
    const { name, email, password, conf_password } = body;
    const SQLQuery =    `INSERT INTO client (name, email, password, conf_password)
                         VALUES (?, ?, ?, ?)`
    const values = [name, email, password, conf_password]

    return dbPool.query(SQLQuery, values)
}

//LOGIN USER
const loginUser = (body) => {
    const SQLQuery = 'SELECT * FROM client WHERE email=?'
    const values = [body.email]

    return dbPool.query(SQLQuery, values)
}

const profileUser = (client_id) => {
    const SQLQuery = 'SELECT * FROM client WHERE client_id=?'
    const values = [client_id]

    return dbPool.query(SQLQuery, values)
}

module.exports = {
    createNewUser,
    loginUser,
    profileUser
}