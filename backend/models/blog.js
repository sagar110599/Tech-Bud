const mongoose = require('mongoose')
const User = require('./user').User;
let Blog = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags:[{
        type: String,
        
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    summary: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
   
    img:{
        data: Buffer,
        contentType: String
    },
    },
    { timestamps: true },
    )
exports.Blog = mongoose.model('Blog', Blog);