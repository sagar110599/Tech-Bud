import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { TechFeedComponent } from './tech-feed/tech-feed.component';
import { LoginComponent } from './login/login.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ProfileComponent } from './profile/profile.component';
import { AgePipe } from './pipes/age.pipe';
import { PricePipe } from './pipes/price.pipe';
import { ProductSearchService } from './product-search/product-search.service';
import { HighlightDirective } from './tech-feed/highlight.directive';
import { IfLoadedDirective } from './product-search/if-loaded.directive';
import { AuthGuard } from './login/auth.guard';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { ViewBlogComponent } from './blogs/view-blog/view-blog.component';
import { ShowAllBlogsComponent } from './blogs/show-all-blogs/show-all-blogs.component';
import { ImagePipePipe } from './pipes/image-pipe.pipe';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
import { BlogService } from './blogs/blog.service';
import { UserService } from './profile/user.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductSearchComponent,
    TechFeedComponent,
    LoginComponent,
    ErrorpageComponent,
    ProfileComponent,
    AgePipe,
    PricePipe,
    HighlightDirective,
    IfLoadedDirective,
    CreateBlogComponent,
    
    ShowAllBlogsComponent,
    ImagePipePipe,
    ViewBlogComponent,
    EditBlogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    ProductSearchService,
    BlogService,
    UserService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '733054498458-cmr6vdagjhacbt95j89kpr6cknm2kk2b.apps.googleusercontent.com'
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
