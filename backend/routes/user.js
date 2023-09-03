const express = require('express')
const { OAuth2Client } = require('google-auth-library');
const db = require('../models/user');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
const bb = require('../models/blog');
const router = express.Router()
var multer = require('multer');
const id = '733054498458-cmr6vdagjhacbt95j89kpr6cknm2kk2b.apps.googleusercontent.com';
const secret = 'b7cHgGOrZT4COEAQBBZTk55m';
const client = new OAuth2Client(id);
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });

router.post('/register', function (req, res) {
    db.User.countDocuments({ 'email': req.body.email }, function (err, c) {
        if (c == 0) {
            const u = new db.User({
                email: req.body.email,
                password: req.body.password,
            })
            u.save();
            res.status(200).json({ "details": "Sucessfully Registered" })
        }
        else {
            res.status(400).json({ "details": "User Already exists" })
        }
    });
})
router.post('/login', function (req, res) {
    console.log(req.body.email);
    console.log(req.body.password);
    db.User.findOne({ 'email': req.body.email }, function (err, c) {
        if (err) {
            res.status(400)
        }
        else {
           if(c===null){
            res.status(400).json({ "details": "Please register first." })
           }else{
            if(req.body.password===c.password){
                res.status(200).json({"response":c.id})
            }
            else{
                res.status(400).json({details:"Wrong password"})
            }
        }
        }
    });
}) 

router.post('/google-login', function (req, res, next) {
    db.User.countDocuments({ 'email': req.body.email }, function (err, c) {
        if (c == 0) {
            res.status(400).json({ "details": "Please register first." })
        }
        else {
            next()
        }
    });
})

router.post('/details', function (req, res) {
    console.log(req.body.email);
    db.User.findOne({ email: req.body.email }, function (err, u) {
        if (err) {
            res.status(400);
        } else {
            console.log(u);
            res.status(200).json({ 'details': u })
        }
    })
})

router.post('/update-details',upload.single('file'), function (req, res) {
    console.log(req.body.password)
    
   db.User.findOne({ email: req.body.email }, function (err, u) {
        if (err) {
            res.status(400);
        } else {
            u.password = req.body.password;
            u.fname=req.body.fname;
            u.lname=req.body.lname;
            u.dob=req.body.dob;
            if(req.file){
            filepath=(path.join(__dirname,"../uploads/",req.file.filename));
            u.img.data=fs.readFileSync(filepath);
            u.img.contentType='image/png'
            
            fs.unlinkSync(filepath);
            }
            u.save();
            res.status(200).json({ 'details': u });
        }
        
    }) 
})

router.post('/delete-user', function (req, res) {
    db.User.findOne({ email: req.body.email }, function (err, u) {
        if (err) {
            res.status(400);
        } else {
        bb.Blog.deleteMany({author: u._id},function (err, result) {
        console.log(result.deletedCount);
    });
}
})
    db.User.deleteOne({ email: req.body.email }, function (err, u) {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json({ 'details': true })
        }
    })
})

router.post('/google-login', function (req, res) {
    async function verify() {
        console.log(req.body.token);
        db.User.findOne({ 'email': req.body.email }, async function (err, c) {
            if (err) {
                res.status(400)
            }
            else {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: id
        });
        const payload = ticket.getPayload();
        const userDetails = {
            email: payload['email'],
            firstname: payload['given_name'],
            lastname: payload['family_name']
        }
        let token = jwt.sign(userDetails, secret, { expiresIn: 1440 });
        res.status(200).json({ details: userDetails, token: token ,id:c.id})
    }
    })
}
    verify().catch(console.error);
})

module.exports = router
