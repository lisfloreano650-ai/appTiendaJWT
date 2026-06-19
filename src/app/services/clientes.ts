import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private API = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any> {
    return this.http.get(this.API);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  guardar(datos: any): Observable<any> {
    return this.http.post(this.API, datos);
  }

  actualizar(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, datos);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  validarAcceso(datos: { usuario: string; clave: string }): Observable<any> {
    return this.http.post('http://localhost:3000/api/login', datos);
  }
}