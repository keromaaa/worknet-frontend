import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthLoginRequest, AuthResponse } from '../../../types/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginRequest: AuthLoginRequest = {
    email: '',
    password: '',
  };

  rememberMeValue: boolean = false;
  loginError: boolean = false;
  loginErrorMessage: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  async onSubmit() {
    const response = await this.authService.login(
      this.loginRequest,
      this.rememberMeValue
    );

    if (response === true) {
      this.loginError = false;
      this.loginErrorMessage = '';
      this.router.navigateByUrl('/landingPage');
      this.toastr.success('You have logged in successfully.');
    } else {
      this.loginErrorMessage = response;
      this.loginError = true;
    }
  }
}
