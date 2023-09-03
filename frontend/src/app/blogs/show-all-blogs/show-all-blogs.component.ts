import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BlogService } from '../blog.service';
import { Blog } from '../view-blog/blog';

@Component({
  selector: 'app-show-all-blogs',
  templateUrl: './show-all-blogs.component.html',
  styleUrls: ['./show-all-blogs.component.css']
})
export class ShowAllBlogsComponent implements OnInit {

  blogs:Array<Blog>=[]
  server:string=environment.apiURL
  constructor(private blogservice:BlogService) { }

  ngOnInit(): void {
    this.blogservice.getAll().then(res => res.json())
    .then(data => {
      console.log(data)
      this.blogs = data;
      
    })
  }

}
