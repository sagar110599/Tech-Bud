import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Author } from './author';
import { Blog } from './blog';
import { environment } from '../../../environments/environment';
import { BlogService } from '../blog.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  server:string=environment.apiURL;
  blog: Blog = {
    description: "",
    summary: "",
    tags: [""],
    title: "",
    img: {data: {data: []}},
    likedBy:[],
    dislikedBy:[],
    _id: ""
  };
  author: Author = {
    fname: "",
    lname: "",
    email: "",
    img: {data: {data: []}}
  };
  isliked:boolean=false;
  isdisliked:boolean=false;

  requestedBlogid:string="";
  constructor(private route:ActivatedRoute,private blogservice:BlogService,private cookieService:CookieService) { }

  ngOnInit(): void {
    this.requestedBlogid=this.route.snapshot.params.id;
    this.blogservice.getBlog(this.requestedBlogid).then(data => {
      console.log(data);
      this.blog=data[1];
      this.author=data[0];
    if(this.blog.likedBy.includes(this.cookieService.get('userid'))){
      this.isliked=true;
    }
    if(this.blog.dislikedBy.includes(this.cookieService.get('userid'))){
      this.isdisliked=true;
    }
      
    }) 
  
  }
  updateLike(){
    if(!this.isdisliked){
    if(this.isliked){
      this.blogservice.like(this.requestedBlogid,this.cookieService.get('userid')).then(data=>{
        this.blog.likedBy.splice(this.blog.likedBy.indexOf(this.cookieService.get('userid')),1);
        console.log(data);
        this.isliked=!this.isliked;
      })
    }else{
    this.blogservice.like(this.requestedBlogid,this.cookieService.get('userid')).then(data=>{
      this.blog.likedBy.push(this.cookieService.get('userid'));
      console.log(data);
      this.isliked=!this.isliked;
    })
  }
}else{
  alert("First Remove Your dislike");
}
    
  }
  updateDisLike(){
    if(!this.isliked){
    if(this.isdisliked){
      this.blogservice.dislike(this.requestedBlogid,this.cookieService.get('userid')).then(data=>{
        this.blog.dislikedBy.splice(this.blog.likedBy.indexOf(this.cookieService.get('userid')),1);
        console.log(data);
        this.isdisliked=!this.isdisliked;
      })
    }else{
    this.blogservice.dislike(this.requestedBlogid,this.cookieService.get('userid')).then(data=>{
      this.blog.dislikedBy.push(this.cookieService.get('userid'));
      console.log(data);
      this.isdisliked=!this.isdisliked;
    })
  }
  }else{
    alert("First Remove Your like");
  }
}


}
