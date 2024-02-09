import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { FormLayoutComponent } from '../form-layout/form-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    RegisterFormComponent,
    LoginFormComponent,
    FormLayoutComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
