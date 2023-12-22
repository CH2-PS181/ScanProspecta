const UsersModel = require ('../models/users.js')
const bcrypt = require ('bcrypt')

const getAllUser = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUser()
    
        res.json({
            message:'Get all user succes',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error,
        })
    }
}

const createUser = async (req, res) => {
    const {body} = req;
    try {
        await UsersModel.createUser(body)
        res.json({
            message:'Create new user succes',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error,
        })
    }
}

const updateUser = async (req, res) => {
    const {body} = req;
    const {idUser} = req.params
    try {
        await UsersModel.updateUser(body, idUser)
        console.log('idUser:', idUser);
        res.json({
            message:'Update user succes',
            data: {
                id: idUser,
                ...body
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error,
        })
    }

}

const deleteUser = async (req, res) => {
    const {idUser} = req.params
    try {
        await UsersModel.deleteUser(idUser);
        res.json ({
            message: 'DELETE user success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

module.exports = {
    getAllUser,
    createUser,
    updateUser, 
    deleteUser
}