import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asistente, NuevoAsistente } from '../../models/charla.model';
import { CharlaService } from '../../services/charla.service';
import { mayorDeEdadValidator } from '../../validators/edad.validator';

@Component({
  selector: 'app-asistente-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './asistente-form.component.html',
  styleUrl: './asistente-form.component.css'
})
export class AsistenteFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private charlaService = inject(CharlaService);

  charlaId = input.required<number>();
  inscrito = output<Asistente>();
  cancelado = output<void>();

  enviando = false;
  mensajeError = '';

  asistenteForm = this.fb.group({
    nombre: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    correo: this.fb.control('', [Validators.required, Validators.email]),
    edad: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.max(120),
      mayorDeEdadValidator
    ])
  });

  get nombreCtrl() {
    return this.asistenteForm.controls.nombre;
  }

  get correoCtrl() {
    return this.asistenteForm.controls.correo;
  }

  get edadCtrl() {
    return this.asistenteForm.controls.edad;
  }

  onSubmit(): void {
    if (this.asistenteForm.invalid) {
      this.asistenteForm.markAllAsTouched();
      return;
    }

    const valor = this.asistenteForm.getRawValue();
    const payload: NuevoAsistente = {
      nombreCompleto: valor.nombre.trim(),
      correo: valor.correo.trim(),
      edad: Number(valor.edad)
    };

    this.enviando = true;
    this.mensajeError = '';

    this.charlaService.inscribirAsistente(this.charlaId(), payload).subscribe({
      next: (asistente) => {
        this.enviando = false;
        this.asistenteForm.reset();
        this.inscrito.emit(asistente);
      },
      error: (err: HttpErrorResponse) => {
        this.enviando = false;
        this.mensajeError = this.extraerMensaje(err);
      }
    });
  }

  private extraerMensaje(err: HttpErrorResponse): string {
    const errores = err.error?.errores as Record<string, string> | undefined;
    if (err.status === 400 && errores) {
      return Object.values(errores).join(' ');
    }
    if (err.error?.mensaje) {
      return err.error.mensaje as string;
    }
    return 'No se pudo inscribir al asistente. Verifique que el servidor esté disponible.';
  }
}
