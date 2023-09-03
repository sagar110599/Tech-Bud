const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./models/user');
require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000
var app = express();

// Middleware functions
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/techbud';
console.log(uri);
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    server: { auto_reconnect: true }
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', function (req, res) {
    res.send("hello")
});

app.use('/', require('./routes/user'));
app.use('/api', require('./routes/api'));
app.use('/file', require('./routes/file'));
app.use('/blog', require('./routes/blog'));
app.use('/feed', require('./routes/rss'));

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
});
