import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  server: string = environment.apiURL;
  constructor(private cookieService:CookieService) { }


  updateDetails(formData:any):Promise<any>{
    return fetch(this.server + "update-details", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
    return data.details
      
    });
  }

  getDetails():Promise<any>{
  
  return fetch(this.server + "details", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body:JSON.stringify({'email':this.cookieService.get('email')})
  
  })
  .then(res => res.json())
  .then(data => {
  return data.details
    
  });
}

deleteUser():Promise<boolean>{
  return fetch(this.server + "delete-user", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body:JSON.stringify({'email':this.cookieService.get('email'),'id':this.cookieService.get('userid')})
  
  })
  .then(res => res.json())
  .then(data => {
  return data.details
    
  });
}
}
