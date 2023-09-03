import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  server: string = environment.apiURL;
  public email="";
  public pass="";
  public fname="";
  public lname="";
  public dob=new Date();
  blogs:any=[];
  imageUrl:any;
  images:any;
  constructor(private cookieService: CookieService,private userservice: UserService) {
    
   }

  ngOnInit(): void {
    console.log(this.dob);
    
      //get-details-of-user
      
      this.userservice.getDetails()
      .then(data => {
        this.set_fields(data)
        
      });
      
      
    
    }
    //Event for profile image selection
    selectImage(event:any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.images = file;
      }
    }
  
    //update-request
    update(password:string,fn:string,ln:string,date:any){
    const formData = new FormData();
    if(this.images){
    formData.append('file', this.images);
    }
    formData.append('password',password);
    formData.append('fname',fn);
    formData.append('lname',ln);
    formData.append('dob',date);
    formData.append('email',this.cookieService.get('email'));
    this.userservice.updateDetails(formData)
      .then(data => {
        alert("updation Sucessfull");
        this.set_fields(data)
        
      });

    }
    //delete-profile-request
    delete(){
      var flag=confirm("Are you sure?");
      if(flag){
      this.userservice.deleteUser()
      .then(data => {
        if(data){
          this.cookieService.deleteAll();
          window.location.href='/';
        }
        
      });
    }
}
    

  set_fields(data:any){
    
    console.log(data);
    this.email=data.email;
    this.pass=data.password;
    
    if(data.fname){
      console.log(data.fname);
      this.fname=data.fname;
    }
    if(data.lname){
      this.lname=data.lname;
    }
    if(data.dob){
      console.log(data.dob);
      this.dob=data.dob
    }
    if(data.img.data){
    
      this.imageUrl=data.img.data.data;
      
    }
    
  }

}
