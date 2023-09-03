const express= require('express');
const router = express.Router();
const Feed = require('feed').Feed;
const db = require('../models/user');
const bb = require('../models/blog');
const site_url='http://localhost:4200/';
let feed = new Feed({
    title: 'TechBud',
    description: 'Latest Technology Blogs',
    link: site_url,
})

router.get('/', function(req, res) {

  // Create rss prototype object and set some base values
  
  bb.Blog.find({}, function (err, blogs) {
      feed.items=[];
    if (err) {
        res.status(400);
    } else {
        blogs.forEach(function(data) {
            categories=[]
            data.tags.forEach(function(value){
                categories.push({
                    name:value
                })
            })
            feed.addItem({
                title: data.title,
                description: data.description,
                link: site_url + 'view-blog/'+data._id,
                category: categories,
                date: data.createdAt,
                
            });
        });
        


    }

})


  res.set('Content-Type', 'application/rss+xml');
  res.send(feed.rss2());
});
module.exports=router;