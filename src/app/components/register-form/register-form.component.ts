import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  passwordValidator,
  passwordMatchValidator,
} from './register-form-validators';
import { RouterLink, Router } from '@angular/router';
import { AuthRegisterRequest } from '../../../types/user';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  nameErrorMessage: string = '';
  companyNameErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  confirmPasswordErrorMessage: string = '';

  registerType: boolean = true;

  registerForm: FormGroup = new FormGroup({
    ime: new FormControl('', Validators.required),
    prezime: new FormControl('', Validators.required),
    imeKompanije: new FormControl(
      '',
      this.registerType ? null : Validators.required
    ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      passwordValidator,
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      passwordMatchValidator,
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  async onSubmit() {
    if (this.registerForm.valid) {
      const registerRequest: AuthRegisterRequest = {
        ime: this.registerForm.value.ime,
        prezime: this.registerForm.value.prezime,
        imeKompanije: this.registerForm.value.imeKompanije,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      const response = await this.authService.register(registerRequest);

      if (response === true) {
        this.router.navigateByUrl('landingPage');
        this.toastr.success('You have registered successfully.');
      }
    }
  }

  changeRegisterType(): void {
    this.clearInputs();
    this.clearErrors();
    this.registerType = !this.registerType;
    this.updateValidators();
  }

  clearInputs(): void {
    this.registerForm.get('ime')?.setValue(null);
    this.registerForm.get('prezime')?.setValue(null);
    this.registerForm.get('imeKompanije')?.setValue(null);
    this.registerForm.get('email')?.setValue(null);
    this.registerForm.get('password')?.setValue(null);
    this.registerForm.get('confirmPassword')?.setValue(null);
  }

  clearErrors(): void {
    this.registerForm.get('ime')?.markAsUntouched();
    this.registerForm.get('prezime')?.markAsUntouched();
    this.registerForm.get('imeKompanije')?.markAsUntouched();
    this.registerForm.get('email')?.markAsUntouched();
    this.registerForm.get('password')?.markAsUntouched();
    this.registerForm.get('confirmPassword')?.markAsUntouched();
  }

  updateValidators(): void {
    const imeControl = this.registerForm.get('ime');
    const prezimeControl = this.registerForm.get('prezime');
    const imeKompanijeControl = this.registerForm.get('imeKompanije');

    if (this.registerType) {
      imeControl?.setValidators([Validators.required]);
      prezimeControl?.setValidators([Validators.required]);
      imeKompanijeControl?.clearValidators();
    } else {
      imeControl?.clearValidators();
      prezimeControl?.clearValidators();
      imeKompanijeControl?.setValidators([Validators.required]);
    }

    imeControl?.updateValueAndValidity();
    prezimeControl?.updateValueAndValidity();
    imeKompanijeControl?.updateValueAndValidity();
  }

  displayFirstNameError(): boolean {
    const fnameControl = this.registerForm.get('ime');
    const lnameControl = this.registerForm.get('prezime');

    if (
      fnameControl?.errors?.['required'] &&
      fnameControl?.touched &&
      !(lnameControl?.errors?.['required'] && lnameControl?.touched)
    ) {
      this.nameErrorMessage = 'First name is required';
      return true;
    }
    return false;
  }

  displayLastNameError(): boolean {
    const fnameControl = this.registerForm.get('ime');
    const lnameControl = this.registerForm.get('prezime');

    if (
      !(fnameControl?.errors?.['required'] && fnameControl?.touched) &&
      lnameControl?.errors?.['required'] &&
      lnameControl?.touched
    ) {
      this.nameErrorMessage = 'Last name is required';
      return true;
    }

    return false;
  }

  displayNameError(): boolean {
    const fnameControl = this.registerForm.get('ime');
    const lnameControl = this.registerForm.get('prezime');

    if (
      fnameControl?.errors?.['required'] &&
      fnameControl?.touched &&
      lnameControl?.errors?.['required'] &&
      lnameControl?.touched
    ) {
      this.nameErrorMessage = 'First and last names are required';
      return true;
    }

    return false;
  }

  displayCompanyNameError(): boolean {
    const companyNameControl = this.registerForm.get('imeKompanije');

    if (
      companyNameControl?.errors?.['required'] &&
      companyNameControl?.touched
    ) {
      this.companyNameErrorMessage = 'Company name is required.';
      return true;
    }

    if (
      companyNameControl?.errors?.['minLength'] &&
      companyNameControl?.touched
    ) {
      this.companyNameErrorMessage =
        'Company name is too short. (min. 2 characters)';
      return true;
    }

    return false;
  }

  displayEmailError(): boolean {
    const emailControl = this.registerForm.get('email');

    if (emailControl?.errors?.['required'] && emailControl?.touched) {
      this.emailErrorMessage = 'Email is required.';
      return true;
    }

    if (emailControl?.errors?.['email']) {
      this.emailErrorMessage = 'Email is invalid.';
      return true;
    }

    return false;
  }

  displayPasswordError(): boolean {
    const passwordControl = this.registerForm.get('password');

    if (passwordControl?.errors?.['required'] && passwordControl?.touched) {
      this.passwordErrorMessage = 'Password is required.';
      return true;
    }

    if (passwordControl?.errors?.['minlength'] && passwordControl?.touched) {
      this.passwordErrorMessage = 'Password is too short. (min. 8 characters)';
      return true;
    }

    if (
      passwordControl?.errors?.['invalidPassword'] &&
      passwordControl?.touched
    ) {
      this.passwordErrorMessage =
        'The password has to contain at least one uppercase letter, lowercase letter and one digit.';
      return true;
    }

    return false;
  }

  displayConfirmPwError(): boolean {
    const confirmPwControl = this.registerForm.get('confirmPassword');

    if (confirmPwControl?.errors?.['required'] && confirmPwControl?.touched) {
      this.confirmPasswordErrorMessage = 'Confirm password field is required.';
      return true;
    }

    if (
      confirmPwControl?.errors?.['mismatch'] &&
      confirmPwControl?.touched &&
      !confirmPwControl?.errors?.['required']
    ) {
      this.confirmPasswordErrorMessage = "The passwords don't match.";
      return true;
    }

    return false;
  }
}
