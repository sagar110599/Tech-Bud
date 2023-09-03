import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TechBud';
  islogged=false;
  constructor(private cookieService: CookieService) {
    if(this.cookieService.get('email')){
      this.islogged=true;
    }
    
  }
  logout(){
    
    this.cookieService.deleteAll();
    window.location.href='/';
  }
  
}
