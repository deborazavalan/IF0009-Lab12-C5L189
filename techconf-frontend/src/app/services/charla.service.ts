import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistente, Charla, NuevaCharla, NuevoAsistente } from '../models/charla.model';

@Injectable({
  providedIn: 'root'
})
export class CharlaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/charlas';

  getCharlas(): Observable<Charla[]> {
    return this.http.get<Charla[]>(this.apiUrl);
  }

  registrarCharla(charla: NuevaCharla): Observable<Charla> {
    return this.http.post<Charla>(this.apiUrl, charla);
  }

  inscribirAsistente(charlaId: number, asistente: NuevoAsistente): Observable<Asistente> {
    return this.http.post<Asistente>(`${this.apiUrl}/${charlaId}/asistentes`, asistente);
  }
}
