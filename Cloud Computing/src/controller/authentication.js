const { createNewUser, loginUser, profileUser } = require('../models/authentication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//REGISTRATION NEW USER
const register = async (req, res) => {
    const { name, email, password, conf_password } = req.body;

    try {
        if (password !== conf_password) {
            return res.status(400).json({ message: "Password and confirmation password do not match" });
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        await createNewUser({
            name: name,
            email: email,
            password: hashPassword,
            conf_password: hashPassword,
        });

        res.json({
            message: "Registration successful",
            data: {name, email}
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error during registration",
            error: error.message 
        });
    }
};

//LOGIN USER
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter your email and password"
            });
        }

        const [client] = await loginUser({email, password});

        const isMatch = await bcrypt.compare(password, client[0].password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect email or password"
            });
        }

        const logUser = { id: client[0].client_id, email: client[0].email };
        const accessToken = jwt.sign(logUser, process.env.SECRET_KEY, { expiresIn: '1h' });
        const refreshToken = jwt.sign(logUser, process.env.REFRESH_TOKEN_KEY, { expiresIn: '1h' });

        const responseData = {
            code: 200,
            status: "OK",
            client_id: client[0].client_id,
            name: client[0].name,
            email: client[0].email,
            message: 'Login berhasil',
            accessToken: accessToken,
            refreshToken: refreshToken
        };

        res.json(responseData);

    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'INTERNAL SERVER ERROR',
            message: error.message,
            data: null,
        });
    }
};

const profile = async (req, res) =>{ 
    const client_id = req.params.client_id;
    try {
        const [data] = await profileUser(client_id)     
        if (data.length === 0) {
            return res.status(404).json({
                message: 'client not found',
            });
        } else {
            res.json({
                message: 'Get client by ID success',
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
    register,
    login,
    profile
};
