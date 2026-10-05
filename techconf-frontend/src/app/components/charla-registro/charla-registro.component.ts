import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asistente, Charla, NIVELES, NuevaCharla } from '../../models/charla.model';
import { CharlaService } from '../../services/charla.service';
import { validarRangoFechas } from '../../validators/rango-fechas.validator';
import { AsistenteFormComponent } from '../asistente-form/asistente-form.component';

@Component({
  selector: 'app-charla-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsistenteFormComponent],
  templateUrl: './charla-registro.component.html',
  styleUrl: './charla-registro.component.css'
})
export class CharlaRegistroComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private charlaService = inject(CharlaService);

  readonly niveles = NIVELES;

  charlas: Charla[] = [];
  charlasConFormularioAbierto = new Set<number>();
  mensajeExito = '';
  mensajeError = '';
  enviando = false;

  registroForm = this.fb.group(
    {
      titulo: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      expositor: this.fb.control('', [Validators.required]),
      nivel: this.fb.control('Principiante', [Validators.required]),
      emailContacto: this.fb.control('', [Validators.required, Validators.email]),
      fechaInicio: this.fb.control('', [Validators.required]),
      fechaFin: this.fb.control('', [Validators.required]),
      etiquetas: this.fb.array([this.crearEtiqueta()])
    },
    { validators: [validarRangoFechas] }
  );

  ngOnInit(): void {
    this.cargarCharlas();
  }

  get tituloCtrl() {
    return this.registroForm.controls.titulo;
  }

  get expositorCtrl() {
    return this.registroForm.controls.expositor;
  }

  get emailCtrl() {
    return this.registroForm.controls.emailContacto;
  }

  get fechaInicioCtrl() {
    return this.registroForm.controls.fechaInicio;
  }

  get fechaFinCtrl() {
    return this.registroForm.controls.fechaFin;
  }

  get etiquetasArray(): FormArray<FormControl<string>> {
    return this.registroForm.controls.etiquetas;
  }

  private crearEtiqueta(): FormControl<string> {
    return this.fb.control('', [Validators.required]);
  }

  agregarEtiqueta(): void {
    this.etiquetasArray.push(this.crearEtiqueta());
  }

  removerEtiqueta(indice: number): void {
    if (this.etiquetasArray.length > 1) {
      this.etiquetasArray.removeAt(indice);
    }
  }

  cargarCharlas(): void {
    this.charlaService.getCharlas().subscribe({
      next: (data) => (this.charlas = data),
      error: () => (this.mensajeError = 'No se pudieron cargar las charlas. Verifique que el servidor esté disponible.')
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const valor = this.registroForm.getRawValue();
    const nuevaCharla: NuevaCharla = {
      titulo: valor.titulo.trim(),
      expositor: valor.expositor.trim(),
      nivel: valor.nivel,
      emailContacto: valor.emailContacto.trim(),
      fechaInicio: valor.fechaInicio,
      fechaFin: valor.fechaFin,
      etiquetas: valor.etiquetas.map((etiqueta) => etiqueta.trim()).filter((etiqueta) => etiqueta.length > 0)
    };

    this.enviando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    this.charlaService.registrarCharla(nuevaCharla).subscribe({
      next: (charla) => {
        this.enviando = false;
        this.mensajeExito = '¡Charla registrada exitosamente!';
        this.charlas.push({ ...charla, asistentes: charla.asistentes ?? [] });
        this.reiniciarFormulario();
      },
      error: (err: HttpErrorResponse) => {
        this.enviando = false;
        this.mensajeError = err.error?.mensaje ?? 'No se pudo registrar la charla.';
      }
    });
  }

  private reiniciarFormulario(): void {
    this.etiquetasArray.clear();
    this.etiquetasArray.push(this.crearEtiqueta());
    this.registroForm.reset({ nivel: 'Principiante' });
  }

  alternarInscripcion(charlaId: number): void {
    if (this.charlasConFormularioAbierto.has(charlaId)) {
      this.charlasConFormularioAbierto.delete(charlaId);
    } else {
      this.charlasConFormularioAbierto.add(charlaId);
    }
  }

  onAsistenteInscrito(charla: Charla, asistente: Asistente): void {
    charla.asistentes = [...(charla.asistentes ?? []), asistente];
    this.charlasConFormularioAbierto.delete(charla.id!);
    this.mensajeError = '';
    this.mensajeExito = `${asistente.nombreCompleto} fue inscrito en "${charla.titulo}".`;
  }
}
