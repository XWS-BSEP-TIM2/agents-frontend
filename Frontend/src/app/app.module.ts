import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AvatarModule } from 'ngx-avatar';
import { NgxMaterialRatingModule } from 'ngx-material-rating';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { PostDisplayComponent } from './components/post-display/post-display.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FeedComponent } from './components/feed/feed.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPostDialogComponent } from './components/new-post-dialog/new-post-dialog.component';
import { PostPageComponentComponent } from './components/post-page-component/post-page-component.component';
import { DetailedPostDisplayComponent } from './components/post-page-component/detailed-post-display/detailed-post-display.component';
import { WriteCommentComponent } from './components/post-page-component/write-comment/write-comment.component';
import { CommentPreviewComponent } from './components/post-page-component/comment-preview/comment-preview.component';
import { PhotoLightBoxComponent } from './components/post-page-component/photo-light-box/photo-light-box.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    DashboardComponent,
    SidebarComponent,
    ProfilePageComponent,
    PostDisplayComponent,
    AdminDashboardComponent,
    FeedComponent,
    HeaderComponent,
    NewPostDialogComponent,
    PostPageComponentComponent,
    DetailedPostDisplayComponent,
    WriteCommentComponent,
    CommentPreviewComponent,
    PhotoLightBoxComponent,
    ProfilePictureComponent,
    NotAuthorizedComponent,
    SidebarRightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AvatarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarRatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
