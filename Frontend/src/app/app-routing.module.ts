import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FeedComponent } from './components/feed/feed.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PostPageComponentComponent as JobOfferPageComponentComponent } from './components/post-page-component/post-page-component.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AuthGuard, UnAuthGuard } from './services/auth-guard.service';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { MyJobOffersPageComponent } from './components/my-job-offers-page/my-job-offers-page.component';
import { SearchFeedComponent } from './components/search-feed/search-feed.component';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';
import { MagicLinkLoginComponent } from './components/magic-link-login/magic-link-login.component';
import { EditProfilePageComponent } from './components/edit-profile-page/edit-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: FeedComponent },
      { path: 'search/:searchText', component: SearchFeedComponent },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: 'job-offer/:id', component: JobOfferPageComponentComponent },
      { path: 'job-offers', component: MyJobOffersPageComponent },
      {
        path: 'user/:id',
        component: ProfilePageComponent,
      },
      { path: 'edit-profile', component: EditProfilePageComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent, canActivate: [UnAuthGuard] },
  {
    path: 'register',
    component: RegistrationPageComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'magic-link/:id',
    component: MagicLinkLoginComponent,
    canActivate: [UnAuthGuard],
  },
  {
    path: 'two-factor',
    component: TwoFactorAuthComponent,
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
