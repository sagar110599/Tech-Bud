import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'; 
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../environments/environment';
import { env } from 'process';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  form: FormGroup;
  server:string=environment.apiURL;
  tagsData:Array<string>=[]
  images:any;
  blog:any;
  author:any;
  requestedBlogid:string="";
  constructor(private cookieService: CookieService,private route:ActivatedRoute,private blogservice:BlogService){
    
    this.form = new FormGroup({
      title: new FormControl(null),
      tags: new FormControl(null),
      description: new FormControl(null),
      summary: new FormControl(null),
      file: new FormControl(null)
    });
    
  }
  ngOnInit(): void {
    this.requestedBlogid=this.route.snapshot.params.id;
    this.blogservice.getBlog(this.requestedBlogid).then(data => {
      console.log(data);
      this.blog=data[1];
      this.author=data[0];
      if(this.author.email!=this.cookieService.get('email')){
        window.location.href='profile';
       }else{
        this.setFormFeilds();
       }
    })
    
    

  }
  //Event for profile image selection
  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  
  onSubmit(){
    this.form.disable();
    const formData = new FormData();

    // console.log("Type is: ",this.form.value)
    var obj=this.form.value
    for ( var key in this.form.value ) {
      console.log(key);
      console.log(obj[key]);
      if(key==="tags" || key==="file"){
        continue;
      }else{
      formData.append(key, obj[key]);
      }
  }
  ;
  formData.append('blogid',this.requestedBlogid);
  formData.append('tags',JSON.stringify(this.tagsData));
  if(this.images){
  formData.append('file',this.images);
}
this.blogservice.editBlog(formData).then(data => {
  console.log(data)
  alert("Blog Created!!!");
  
});
  // console.log("Form data is: ",formData,typeof(formData))

    
  }
  clear(){
    this.form.reset();
    this.form.enable();
  }
  addTag(){
    if(this.form.get('tags')?.value.length!=0){
    this.tagsData.push((this.form.get('tags')?.value));
    
    }
  }
  tagRemove(item:any){
    this.tagsData.splice(item,1);
  }

  deleteBlog(){
    this.blogservice.deleteBlog(this.requestedBlogid).then(data => {
      console.log(data)
      alert("Blog Deleted!!!");
      window.location.href='/profile';
      
    })
  }
  setFormFeilds(){
    this.form = new FormGroup({
      title: new FormControl(this.blog.title),
      description: new FormControl(this.blog.description),
      summary: new FormControl(this.blog.summary),
      file: new FormControl(null),
      tags: new FormControl(null),
    });
    this.tagsData=this.blog.tags
  }



}
