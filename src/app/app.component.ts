import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    LogoComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginComponent,
    RegisterComponent,
    RouterLink,
    LoaderComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'WorkNet';

  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
