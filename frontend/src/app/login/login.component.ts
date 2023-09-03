import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';  
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  server: string = environment.apiURL;
  public classname = "container";

  constructor(private authService: SocialAuthService, private cookieService: CookieService) {

  }
  loginForm = new FormGroup({
    uname: new FormControl(''),
    pass: new FormControl(''),
  });
  registerForm = new FormGroup({
    uname: new FormControl(''),
    pass1: new FormControl(''),
    pass2: new FormControl(''),
  });

  slideToSignup() {
    this.classname = "container right-panel-active"
  }

  slideToSignin() {
    this.classname = "container";
  }
  //normal login
  login(){
    var formdata=this.loginForm.value;
    fetch(this.server + "login", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({'email': formdata.uname, 'password': formdata.pass})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
       if(data['response']){
        this.cookieService.set('email', formdata.uname); 
        this.cookieService.set('userid', data['response']); 
        window.location.href='/';
      }else{
      alert(data['details']);
      } 
    })
    .catch((error) => {
      console.error('Error:', error);
    });;
  }
  //login via google
  signinViaGoogle() {
    console.log("Google SignIn");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (data) => {
        console.log(data.email + " " + data.authToken);
        fetch(this.server + "google-login", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({ 'token': data.idToken, 'email': data.email })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if(data.details.email){
            this.cookieService.set('email', data.details.email);  
            this.cookieService.set('name', data.details.firstname + ' ' + data.details.lastname);
            this.cookieService.set('token', data.token);
           this.cookieService.set('userid', data.id);
            window.location.href='/';
            }else{
            alert(data.details)
            }
          });
      }
    );
  }

  //register
  register() {
    var formdata=this.registerForm.value;
    if(formdata.pass1==formdata.pass2){
    
    fetch(this.server + "register", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({'email': formdata.uname, 'password': formdata.pass1 })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert(data['details']);
    });
  }else{
    alert("Password does not match");
  }
}

  ngOnInit(): void {
  }
}
