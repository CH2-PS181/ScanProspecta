const express = require('express');

const UserController = require ('../controller/users.js')

const router = express.Router();

//READ - GET
router.get('/', UserController.getAllUser);

//CREATE - POST
router.post('/', UserController.createUser);

//UPDATE - PATCH
router.patch('/:user_id', UserController.updateUser)

//DELETE - DELETE
router.delete('/:user_id', UserController.deleteUser)

module.exports = router;