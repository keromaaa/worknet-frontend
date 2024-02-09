import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { authRedirectGuard } from './guards/auth-redirect.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { JobLookupComponent } from './components/job-lookup/job-lookup.component';
import { PostComponent } from './components/post/post.component';
import { NewPostComponent } from './components/new-post/new-post.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authRedirectGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authRedirectGuard],
  },
  {
    path: 'landingPage',
    component: LandingPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'jobLookup',
    component: JobLookupComponent,
    canActivate: [authGuard],
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'post/:id',
    component: PostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'new-post',
    component: NewPostComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'landingPage', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
