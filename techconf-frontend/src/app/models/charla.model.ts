export const NIVELES = ['Principiante', 'Intermedio', 'Avanzado'] as const;

export interface Asistente {
  id?: number;
  nombreCompleto: string;
  correo: string;
  edad: number;
}

export interface Charla {
  id?: number;
  titulo: string;
  expositor: string;
  nivel: string;
  emailContacto: string;
  fechaInicio: string;
  fechaFin: string;
  etiquetas: string[];
  asistentes?: Asistente[];
}

export type NuevaCharla = Omit<Charla, 'id' | 'asistentes'>;
export type NuevoAsistente = Omit<Asistente, 'id'>;
