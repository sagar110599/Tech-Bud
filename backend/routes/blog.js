const express = require('express')
const db = require('../models/user');
const bb = require('../models/blog');
var fs = require('fs');
var path = require('path');
const router = express.Router()
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });
router.post('/create', upload.single('file'), function (req, res) {
    console.log("Creation of blog")
    console.log(req.body.email);
    db.User.findOne({ email: req.body.email }, function (err, u) {
        if (err) {
            res.status(400);
        } else {
            console.log(u.email)
            filepath = (path.join(__dirname, "../uploads/", req.file.filename));
            const b = new bb.Blog({
                author: u._id,
                summary: req.body.summary,
                description: req.body.description,
                tags: JSON.parse(req.body.tags),
                title: req.body.title,
                img: {
                    data: fs.readFileSync(filepath),
                    contentType: 'image/png'

                },


            })
            fs.unlinkSync(filepath);

            b.save();

            res.status(200).json({ 'details': b });
        }

    })
})
router.get('/all-blogs', function (req, res) {


    bb.Blog.find({}, function (err, b) {
        if (err) {
            res.status(400);
        } else {
            res.send(b);

        }

    })
})

router.get('/get-blog', function (req, res) {
    console.log(req.query.id);

    bb.Blog.findOne({ _id: req.query.id }, function (err, b) {
        if (err) {
            res.status(400);
        } else {
            db.User.findOne({ _id: b.author },{password:0}, function (err, author) {
                res.status(200).json({ 'author': author, 'blog': b })
            })


        }

    })
})

router.post('/all-blogs-user', function (req, res) {

    console.log(req.body.email);
    db.User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            res.status(400);
        } else {
            console.log(user.id)
            bb.Blog.find({ author: user._id }, function (err, blogs) {
                res.status(200).json({ 'blog': blogs })
            })


        }

    })
})
router.post('/update-blog', upload.single('file'), function (req, res) {

    console.log(req.body.blogid);
    bb.Blog.findOne({ _id: req.body.blogid }, function (err, b) {
        if (err) {
            res.status(400);
        } else {

            b.title = req.body.title;
            b.description = req.body.description;
            b.summary = req.body.summary;
            b.tags = JSON.parse(req.body.tags);
            if (req.file) {
                filepath = (path.join(__dirname, "../uploads/", req.file.filename));
                b.img.data = fs.readFileSync(filepath),
                    b.img.contentType = 'image/png';
            }
            b.save();
            res.status(200).json({ 'blog': b })

        }

    })
})
router.post('/delete-blog', function (req, res) {
    bb.Blog.deleteOne({ _id: req.body.blogid }, function (err, u) {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json({ 'details': true })
        }
    })
})

router.post('/update-like', function (req, res) {
    
    console.log(req.body.userid);
    bb.Blog.findOne({ _id: req.body.blogid }, function (err, b) {
        if (err) {
            res.status(400);
        } else {
            db.User.findOne({_id: req.body.userid }, function (err, user) {
                if (err) {
                    res.status(400);
                } else {
                    console.log(user.email)
                    if(b.likedBy.includes(user.id)){
                        const index = b.likedBy.indexOf(user.id);
                        b.likedBy.splice(index,1);
                    }else{
                    b.likedBy.push(user);
                    }
                    b.save();
                    res.status(200).json({ 'details': true })
                    
        
        
                } 
            
        })
    }
    })
})
router.post('/update-dislike', function (req, res) {
    
    console.log(req.body.userid);
    bb.Blog.findOne({ _id: req.body.blogid }, function (err, b) {
        if (err) {
            res.status(400);
        } else {
            db.User.findOne({_id: req.body.userid }, function (err, user) {
                if (err) {
                    res.status(400);
                } else {
                    console.log(user.email)
                    if(b.dislikedBy.includes(user.id)){
                        const index = b.dislikedBy.indexOf(user.id);
                        b.dislikedBy.splice(index,1);
                    }else{
                    b.dislikedBy.push(user);
                    }
                    b.save();
                    res.status(200).json({ 'details': true })
                    
        
        
                } 
            
        })
    }
    })
})
module.exports = router