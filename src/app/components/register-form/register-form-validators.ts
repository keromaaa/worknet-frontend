import {AbstractControl, ValidationErrors} from '@angular/forms';
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/;
  return passwordRegex.test(control.value) ? null : { invalidPassword: true };
}
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password: string = control.parent?.get('password')?.value;
  const confirmPassword: string = control.value;
  return password === confirmPassword ? null : { mismatch: true };
}
