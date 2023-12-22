const dbPool = require ('../config/database.js')

// get all users
const getAllUser = () => {
    const SQLQuery = 'SELECT * FROM users'
    
    return dbPool.execute(SQLQuery)
}

//create new users
const createUser = (body) => {
    const SQLQuery = `   INSERT INTO users (name, password, email, )
                         VALUE ('${body.name}', '${body.password}', '${body.email}')`
    return dbPool.execute(SQLQuery)
}

//update users
const updateUser = (body, idUser) => {
    const SQLQuery = `  UPDATE users 
                        SET name='${body.name}', password='${body.password}', email='${body.email}', address='${body.address}'
                        WHERE id=${idUser}`
    return dbPool.execute(SQLQuery)
}

//delete users
const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    deleteUser
}