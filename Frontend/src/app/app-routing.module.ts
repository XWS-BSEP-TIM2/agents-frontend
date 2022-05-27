import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FeedComponent } from './components/feed/feed.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PostPageComponentComponent } from './components/post-page-component/post-page-component.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AuthGuard, UnAuthGuard } from './services/auth-guard.service';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: FeedComponent },
      {
        path: 'admin',
        component: AdminDashboardComponent,
      },
      { path: 'post/:id', component: PostPageComponentComponent },
      {
        path: 'user/:id',
        component: ProfilePageComponent,
      },
    ],

    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginPageComponent, canActivate: [UnAuthGuard] },
  {
    path: 'register',
    component: RegistrationPageComponent,
    canActivate: [UnAuthGuard],
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
