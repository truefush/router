const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on("error", err => console.log(`Error: ${err}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
    }
})

const upload = multer({ storage: storage })

app.post('/uploadfile', upload.single('myFile'), (req, res) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        return res.status(400).send('Error subiendo el archivo');
    }
    res.status(200).send(`Archivo subido correctamente!`);
})