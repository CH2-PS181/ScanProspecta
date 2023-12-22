const multer = require ('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'image');
    },
    filename: (req, file, cb) => {
        const timeStamp = new Date().getTime();
        const originalname = file.originalname;
        // const extension = path.extname(file.originalname);

        cb(null, `${timeStamp}-${originalname}`);
    }
})

//KONFIGURASI MULTER
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fieldSize: 4 * 1000 * 1000 //3MB
    }
});

module.exports = upload