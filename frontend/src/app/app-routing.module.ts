import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductSearchComponent } from './product-search/product-search.component';
import { TechFeedComponent } from './tech-feed/tech-feed.component';
import {LoginComponent} from './login/login.component';
import {ErrorpageComponent} from './errorpage/errorpage.component'
import {ProfileComponent} from './profile/profile.component';
import { AuthGuard } from './login/auth.guard';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { ShowAllBlogsComponent } from './blogs/show-all-blogs/show-all-blogs.component';
import { ViewBlogComponent } from './blogs/view-blog/view-blog.component';
import { EditBlogComponent } from './blogs/edit-blog/edit-blog.component';
const routes: Routes = [
  { path: '', component: ProductSearchComponent },
  { path: 'techfeed', component: TechFeedComponent },
  {path:'login',component:LoginComponent},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
  {path:'create-blog',canActivate:[AuthGuard],component:CreateBlogComponent},
  {path:'show-blogs',canActivate:[AuthGuard],component:ShowAllBlogsComponent},
  {path:'view-blog/:id',canActivate:[AuthGuard],component:ViewBlogComponent},
  {path:'edit-blog/:id',canActivate:[AuthGuard],component:EditBlogComponent},
  {path:'**',component:ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
