import { AbstractControl, ValidationErrors } from '@angular/forms';

export function locationValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.value.id == 1 || control.value === ''
    ? { selected: true }
    : null;
}

export function dateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  const timeDifference = selectedDate.getTime() - currentDate.getTime();

  const daysDifference = timeDifference / (1000 * 3600 * 24);

  if (daysDifference < 14) {
    return { invalid: true };
  }

  return null;
}

export function industryValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.value === null ? { invalid: true } : null;
}

export function typeValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control.value === null ? { invalid: true } : null;
}
