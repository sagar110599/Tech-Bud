import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Blog } from './view-blog/blog';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  server:string=environment.apiURL+"blog"
  constructor() { }

  getAll(){
    return fetch(this.server + "/all-blogs", {
      method: "GET",})
  }
  
  getBlog(requestedBlogid:string):Promise<any>{
    return fetch(this.server + "/get-blog?id="+requestedBlogid)
    .then(res => res.json())
    .then(data => {
      return [data.author,data.blog];
    });
  }

  createBlog(formData:any):Promise<Blog>{
    return fetch(this.server + "/create", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      
      return data.details
      
    });
  }

  editBlog(formData:any):Promise<Blog>{
    return fetch(this.server + "/update-blog", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      
      return data.details
      
    });
  }

  deleteBlog(requestedBlogid:string):Promise<boolean>{
    return fetch(this.server + "/delete-blog", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body:JSON.stringify({'blogid':requestedBlogid})
    
    })
    .then(res => res.json())
    .then(data => {
      if(data.details)
      return true
      else
      return false 
      
    });
  }

  like(requestedBlogid:string,userid:string):Promise<boolean>{
    return fetch(this.server + "/update-like", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body:JSON.stringify({'blogid':requestedBlogid,'userid':userid})
    
    })
    .then(res => res.json())
    .then(data => {
      if(data.details)
      return true
      else
      return false 
      
    });
  }

  dislike(requestedBlogid:string,userid:string):Promise<boolean>{
    return fetch(this.server + "/update-dislike", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body:JSON.stringify({'blogid':requestedBlogid,'userid':userid})
    
    })
    .then(res => res.json())
    .then(data => {
      if(data.details)
      return true
      else
      return false 
      
    });
  }



}
