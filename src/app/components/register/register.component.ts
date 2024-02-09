import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { FormLayoutComponent } from '../form-layout/form-layout.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    RegisterFormComponent,
    FormLayoutComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
