import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'; 
import { environment } from '../../../environments/environment';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateBlogComponent implements OnInit {

  form: FormGroup;
  server:string = environment.apiURL;
  tagsData:Array<string>=[]
  images:any;
  constructor(private cookieService: CookieService,private blogservice:BlogService){
    
    this.form = new FormGroup({
      title: new FormControl(null),
      tags: new FormControl(null),
      description: new FormControl(null),
      summary: new FormControl(null),
      file: new FormControl(null)
    });
    
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
  formData.append('email',this.cookieService.get('email'));
  formData.append('tags',JSON.stringify(this.tagsData))
  formData.append('file',this.images);

  
  this.blogservice.createBlog(formData).then(data => {
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

  ngOnInit(): void {
  }

}
