import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const EDAD_MINIMA = 18;

export const mayorDeEdadValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = control.value;

  if (valor === null || valor === undefined || valor === '') {
    return null;
  }

  const edad = Number(valor);

  if (Number.isNaN(edad)) {
    return { edadInvalida: true };
  }

  return edad >= EDAD_MINIMA ? null : { menorDeEdad: { requerida: EDAD_MINIMA, actual: edad } };
};
