import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarRangoFechas: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const inicio = control.get('fechaInicio')?.value as string | null | undefined;
  const fin = control.get('fechaFin')?.value as string | null | undefined;

  if (inicio && fin) {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    if (fechaFin < fechaInicio) {
      return { fechasInvalidas: true };
    }
  }

  return null;
};
