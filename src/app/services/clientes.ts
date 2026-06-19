import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // ✅ Dirección definitiva que ya probamos
  private API = 'https://apptiendajwt.onrender.com/api/clientes';
  private API_LOGIN = 'https://apptiendajwt.onrender.com/api/login';

  constructor(private http: HttpClient) { }

  // Obtener todos los clientes
  obtenerTodos(): Observable<any> {
    return this.http.get(this.API);
  }

  // Obtener un cliente por ID
  obtenerPorId(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  // Guardar cliente nuevo
  guardar(datos: any): Observable<any> {
    return this.http.post(this.API, datos);
  }

  // Actualizar cliente
  actualizar(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, datos);
  }

  // Eliminar cliente
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }

  // ✅ Método para iniciar sesión (el que usa tu login)
  validarAcceso(credenciales: { usuario: string; clave: string }): Observable<any> {
    return this.http.post(this.API_LOGIN, credenciales);
  }
}