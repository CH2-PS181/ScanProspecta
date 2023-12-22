//IMPORT MODULE
require('dotenv').config();
const express = require ('express');
const middlewareLogRequest = require ('./src/middleware/logs.js')

//IMPORT MODUL YANG DIPERLUKAN DI ROUTES
const userRoutes = require ('./src/routes/users.js');
const findJobRoutes = require ('./src/routes/findJob.js');
const resumeExampleRoutes = require ('./src/routes/resumeExample.js');
const authenticationRoutes = require ('./src/routes/authentication.js');
const upload = require('./src/middleware/multer.js');


const app = express();

//middleware
app.use(middlewareLogRequest);
app.use(express.static('image'))
app.use(express.json());

//routes
app.use('/authentication', authenticationRoutes)
app.use('/auth', userRoutes)
app.use('/find_job', findJobRoutes)
app.use('/resume_example', resumeExampleRoutes)
app.post('/upload', upload.single('file'),(req, res) => {
    res.json({
        message: "Upload success"
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`)
})