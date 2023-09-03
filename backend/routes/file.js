const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) // link relative to root dir
const path = require('path')
const fs = require('fs')
const lineReader = require('readline')

const checkAccess = filepath => {
    fs.access(filepath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
        if (err) {
            console.error(`${filepath} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`)
        } else {
            console.log(`${filepath} exists, and it is writable`)
        }
    })
}

const lineCount = async (filepath) => {
    const data = await fs.readFileSync(filepath)
    const res = data.toString().split('\n').length
    return res - 1
}

const fileLineReader = (filepath) => {
    const rl = lineReader.createInterface({
        input: fs.createReadStream(filepath),
        crlfDelay: Infinity
    })
    rl.on('line', (line) => {
        console.log(`Line from file: ${line}`)
    })
}

router.get('/uploadFile', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/fileUpload.html'))
})

router.post('/uploadSingle', upload.single('resume'), async (req, res) => {
    const filepath = path.join(__dirname, '..', req.file.path)
    // check access and existense (in this case obviously you can read/write)
    checkAccess(filepath)
    const lc = await lineCount(filepath)
    fileLineReader(filepath)
    res.status(200).send(`uploaded file has ${lc} number of lines`)
})

router.post('/uploadMultiple', upload.array('uploadedImages', 10), (req, res) => {
    const files = req.files;
    console.log(files);
    res.status(200).send("uploaded");
})

module.exports = router
